// API 사용량을 초과하지 않도록
// Script for test purpose!
// ## NOT COMPLETED !! MUST BE TESTED COMPLETELY

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
    // 0-2. 해당 도시코드를 (하나만) 이용하여 정류소들을 불러온다
    return City.find()[0]
  })
  // 1. 한 도시코드에 대하여
  //    해당 도시코드를 통하여 정류소 조회
  .then((city) => {
    const { cityCode } = city
    const locationFetchValue = {
      url: `http://openapi.tago.go.kr/openapi/service/SuburbsBusInfoService/getSuberbsBusTrminlList?cityCode=${cityCode}&numOfRows=100&ServiceKey=${publicAPIKey}`,
      cityCode: cityCode
    }
    return locationFetchValue
  })
  // 1-1. 각각을 프라미스로 한번 더 감싸서,
  //      요청 보낸 후 결과값에 cityCode를 넣어주도록 하자
  .then(locationFetchValue => {
    const locationPromiseWithCityCode = new Promise((resolve, reject) => {
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
    return locationPromiseWithCityCode
  })
  // 2. Promise.all로 한번에 불러오기... 대신 호출만 하기
  .then((locationPromiseWithCityCode) => {
    return locationPromiseWithCityCode()
  })
  // 3. 각 도시 별 > 도시 별 정류소
  //    drop previous collection if exists
  .then((locationPromiseResult) => {
    const cityCode = locationPromiseResult.cityCode
    const locations = locationPromiseResult.data.response.body.items
    const locationDocument = new Location({
      cityCode: cityCode,
      locationCode: locations.terminalId,
      locationName: locations.terminalNm,
      type: 'suburb',
    })
    return locationDocument
  })
  // 4. insert new data
  .then((locationDocument) => {
    return locationDocument.save()
  })
  .then(result => {
    if (!!result) {
      process.exit(0)
    }
  })
