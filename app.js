const express = require('express')
const path = require('path')
const logger = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 8080

const dbUsername = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbIP = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const connect = require('./schemas')

const app = express()
connect(dbUsername, dbPwd, dbIP, dbPort, dbName)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routers separated in routes/ folder
// const <router> = require('./routes/<router-name>.js')
const routesRouter = require('./routes')
const locationsRouter = require('./locations')

// app.use('/<routing-uri>', <router>)
app.use('/locations', locationsRouter)
app.use('/routes', routesRouter)

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
