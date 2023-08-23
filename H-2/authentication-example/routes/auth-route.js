const {Router} = require('express')
const {register,login} = require('../service/auth-service.js')

const authRouter = Router()

authRouter.post('/register', register) // register
authRouter.post('/login',login) //login 


module.exports = authRouter

