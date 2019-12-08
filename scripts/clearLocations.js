// CLEAR COLLECTIONS - Locations
const mongoose = require('mongoose')
const connect = require('../schemas')
const path = require('path')
require('dotenv').config()

// gather setting values to connect database
const dbUsername = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbIP = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const Location = require('../schemas/location')
connect(dbUsername, dbPwd, dbIP, dbPort, dbName)
  .then(() => {
    return mongoose.connection.db.dropCollection('locations')
  })
  .then((response) => {
    if (response) {
      process.exit(0)
    }
  })
  .catch(err => {
    console.error(err)
    process.exit(0)
  })
