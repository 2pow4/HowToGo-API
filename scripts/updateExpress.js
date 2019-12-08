// UPDATE DATABASE - Location Collection / Express Bus
const mongoose = require('mongoose')
const connect = require('../schemas')
const path = require('path')
require('dotenv').config()
const xlsx = require('xlsx')

// gather setting values to connect database
const dbUsername = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbIP = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const City = require('../schemas/city')
const Location = require('../schemas/location')

connect(dbUsername, dbPwd, dbIP, dbPort, dbName)
  .then(() => {
    // 1. 엑셀 파일로부터 데이터를 불러온다
    const sheet = xlsx.readFile('./scripts/data/express.xlsx').Sheets['getExpBusTrminlList']
    const locationData = xlsx.utils.sheet_to_json(sheet)

    // 2. 불러온 데이터에서, 각 파일을 돌며
    //    해당 파일에 있는 cityCode를 활용하여 Document를 생성
    //    type: express
    const locationDocuments = locationData.map((location) => {
      const locationDocument = new Location({
        cityCode: location.cityCode || '000',
        locationCode: location.locationCode,
        locationName: location.locationName,
        type: 'express',
      })
      return locationDocument
    })

    // DB에 삽입
    return Location.insertMany(locationDocuments)
  })
  .then(result => {
    if (!!result) {
      process.exit(0)
    }
  })
