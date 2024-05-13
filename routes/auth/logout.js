const express = require('express');
const logoutRouter = express.Router();
import { logout } from '../../controllers/authController'

logoutRouter.post('/', logout)

export default logoutRouter