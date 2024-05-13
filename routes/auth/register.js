const express = require('express');
const registerRouter = express.Router();
import { register } from '../../controllers/authController'

registerRouter.post('/register', register)

export default registerRouter