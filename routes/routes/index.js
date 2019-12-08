const express = require('express')
const path = require('path')

// mongoose model to use
const City = require('../../schemas/city')
const Location = require('../../schemas/location')

// router object and other sub-routers
const router = express.Router()

// /routes
router.get('/', (req, res, next) => {

})

module.exports = router
