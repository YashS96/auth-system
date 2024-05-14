import express from 'express'
const loginRouter = express.Router();
import { login, loginOAuth } from '../../controllers/authController.js'

loginRouter.post('/', login)

loginRouter.post('/loginOAuth', loginOAuth) // implementation pending

export default loginRouter