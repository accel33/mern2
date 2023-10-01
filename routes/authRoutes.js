const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController');
const loginLimitador = require('../middleware/loginLimitador');

router.route('/')
    .post(loginLimitador, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router