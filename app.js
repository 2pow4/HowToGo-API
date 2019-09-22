const express = require('express')
const path = require('path')
const logger = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 8080
const dbIP = process.env.DB_IP || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'how-to-go'
const connect = require('./schemas')

const app = express()
connect(dbIP, dbPort, dbName)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routers separated in routes/ folder
// const <router> = require('./routes/<router-name>.js')

// app.use('/<routing-uri>', <router>)

// Other than the routings above, will get error message from the service

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err)
  res.json({
    msg: "잘못된 경로의 접속입니다."
  })
});

app.listen(port, () => {
  console.log('API Server: ' + port + '번 포트에서 대기중')
  console.log('DB Server: ' + dbPort + '번 포트에서 대기중')
})
