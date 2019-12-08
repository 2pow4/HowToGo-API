// UPDATE DATABASE - City Collection
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
connect(dbUsername, dbPwd, dbIP, dbPort, dbName)

// 1. get data from Fetch from Public API
axios.get(`http://openapi.tago.go.kr/openapi/service/ExpBusInfoService/getCtyCodeList?ServiceKey=${publicAPIKey}`)
  .then((response) => {
    if (response.status === 200) {
      const cityList = response.data.response.body.items.item
      return cityList
    }
  })
  // 2. generate new list of cities,
  // drop previous collection if exists
  .then(async (cityList) => {
    // get the length of City collection
    const length = await City.countDocuments()
    const cityListDocuments = cityList.map((city) => {
      const cityDocument = new City({
        cityCode: city.cityCode,
        cityName: city.cityName,
      })
      return cityDocument
    })

    if (length > 0) {
      await mongoose.connection.db.dropCollection('cities')
    }
    return cityListDocuments
  })
  // 3. insert new data
  .then((cityListDocuments) => {
    return City.insertMany(cityListDocuments)
  })
  // 4. if success, exit function
  .then((result) => {
    if (!!result) {
      process.exit(0)
    }
  })
