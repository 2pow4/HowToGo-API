const express = require('express')

// mongoose model to use
const City = require('../../schemas/location')

// router object and other sub-routers
const router = express.Router()

// /routes/gps
router.get('/', (req, res, next) => {

})

module.exports = router
