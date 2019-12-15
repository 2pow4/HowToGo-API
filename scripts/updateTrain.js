// UPDATE DATABASE - Location Collection: Train
// 도시코드는 시외버스와 동일
const mongoose = require('mongoose')
const connect = require('../schemas')
const path = require('path')
require('dotenv').config()
const axios = require('axios')
const isArray = require('../utils/isArray')

// gather setting values to connect database
const dbUsername = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbIP = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const publicAPIKey = process.env.PUBLIC_API_KEY

const Metrocity = require('../schemas/metrocity')
const Location = require('../schemas/location')

// 0-1. DB로부터 도시코드를 불러온다
// 0-2. 해당 도시코드를 각각 이용하여 (약 100개) 정류소들을 불러온다
connect(dbUsername, dbPwd, dbIP, dbPort, dbName)
  .then(() => {
    return Metrocity.find()
  })
  // 1. 한 도시코드에 대하여
  //    각각의 해당 도시코드를 통하여 기차역 조회
  //    City가 아닌 Metrocity에서 도시 코드를 가져옴에 주의
  .then(async cityList => {
    const locationFetchValues = cityList.map((city) => {
      const { cityCode } = city
      const locationFetchValue = {
        url: `http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList?cityCode=${cityCode}&numOfRows=50&ServiceKey=${publicAPIKey}`,
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
  // 3. 각 도시 별 > 도시 별 기차역
  //    drop previous collection if exists
  .then(async locationPromiseResultList => {
    const locationDocumentsArrays = 
    locationPromiseResultList.map((locationPromiseResult, index) => {
      const cityCode = locationPromiseResult.cityCode
      const locations = locationPromiseResult.result.data.response.body.items.item

      // 해당 도시에 기차역이 없는 경우,
      if (locations === undefined) {
        return []
      }
      // 해당 도시에 기차역이 단 하나인 경우,
      if (isArray(locations) === false) {
        const locationDocument = new Location({
          cityCode: cityCode,
          locationCode: locations.nodeid,
          locationName: locations.nodename,
          type: 'train',
        })
        return [locationDocument]
      }

      const locationsInCity = locations.map((locations) => {
        const locationDocument = new Location({
          cityCode: cityCode,
          locationCode: locations.nodeid,
          locationName: locations.nodename,
          type: 'train',
        })
        return locationDocument
      })
      return locationsInCity
    })
    return locationDocumentsArrays
  })
  // 4. insert new data (InsertMany)
  .then(locationDocumentsArrays => {
    const locationDocuments = locationDocumentsArrays.reduce((acc, val) => acc.concat(val), [])
    return Location.insertMany(locationDocuments)
  })
  .then(result => {
    if (!!result) {
      process.exit(0)
    }
  })
  
