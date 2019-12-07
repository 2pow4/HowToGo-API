const express = require('express')

// mongoose model to use
const City = require('../../schemas/city')

// router object and other sub-routers
const router = express.Router()

// /locations
router.get('/', (req, res, next) => {

})

module.exports = router
