const Router = require('express').Router
const registerUser = require('../controllers/user.controller')

const router = Router();

router.route('/register').post(registerUser)

module.exports = router