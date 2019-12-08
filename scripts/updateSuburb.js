// UPDATE DATABASE - Location Collection: Suburb Bus
const mongoose = require('mongoose')
const connect = require('../schemas')
const path = require('path')
require('dotenv').config()
const axios = require('axios')

// gather setting values to connect database
const dbUsername = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbIP = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const publicAPIKey = process.env.PUBLIC_API_KEY

const City = require('../schemas/city')
const Location = require('../schemas/location')

connect(dbUsername, dbPwd, dbIP, dbPort, dbName)
  .then(() => {
    // 0-1. DB로부터 도시코드를 불러온다
    // 0-2. 해당 도시코드를 각각 이용하여 (약 100개) 정류소들을 불러온다
    return City.find()
  })
  // 1. 한 도시코드에 대하여
  //    해당 도시코드를 통하여 정류소 조회
  .then(cityList => {
    const locationFetchValues = cityList.map((city) => {
      const { cityCode } = city
      const locationFetchValue = {
        url: `http://openapi.tago.go.kr/openapi/service/SuburbsBusInfoService/getSuberbsBusTrminlList?cityCode=${cityCode}&numOfRows=100&ServiceKey=${publicAPIKey}`,
        cityCode: cityCode
      }
      return locationFetchValue
    })
    return locationFetchValues
  })
  // 1-1. 각각을 프라미스로 한번 더 감싸서,
  //      요청 보낸 후 결과값에 cityCode를 넣어주도록 하자
  .then(locationFetchValues => {
    const locationPromisesWithCityCode = locationFetchValues.map((locationFetchValue) => {
      return new Promise((resolve, reject) => {
        const { url, cityCode } = locationFetchValue
        axios.get(url)
          .then((response) => {
            if (response.status !== 200) {
              reject('Error with Public API Axios Call!')
            } else {
              const fetchResult = {
                result: response,
                cityCode: cityCode
              }
              resolve(fetchResult)
            }
          })
      })
    })

    return locationPromisesWithCityCode
  })
  // 2. Promise.all로 한번에 불러오기
  .then(locationPromisesWithCityCode => {
    return Promise.all(locationPromisesWithCityCode)
  })
  .catch((err) => {
    console.error(err)
  })
  // 3. 각 도시 별 > 도시 별 정류소
  //    drop previous collection if exists
  .then(locationPromiseResultList => {
    const locationDocuments = 
    locationPromiseResultList.map((locationPromiseResult) => {
      const cityCode = locationPromiseResult.cityCode
      const locations = locationPromiseResult.data.response.body.items
      const locationsInCity = locations.map((locations) => {
        const locationDocument = new Location({
          cityCode: cityCode,
          locationCode: locations.terminalId,
          locationName: locations.terminalNm,
          type: 'suburb',
        })
        return locationDocument
      })
      return locationsInCity
    })
    return locationDocuments
  })
  // 4. insert new data
  .then(locationDocuments => {
    console.log('4')
    // ## TODOS ##
    // before insert, previous collection should be dropped
    return Location.insertMany(locationDocuments)
  })
  .then(result => {
    if (!!result) {
      process.exit(0)
    }
  })
