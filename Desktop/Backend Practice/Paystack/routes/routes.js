const express = require('express')
const router = express.Router();

const payStack = require('../controller/payController')

router.route('/paystack').post(payStack)
module.exports = router