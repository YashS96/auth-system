const express = require('express');
const loginRouter = express.Router();
import { login, loginOAuth } from '../../controllers/authController'

loginRouter.post('/login', login)

loginRouter.post('/logout/', loginOAuth) // implementation pending

export default loginRouter