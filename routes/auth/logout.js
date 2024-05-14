import express from 'express'
const logoutRouter = express.Router();
import { logout } from '../../controllers/authController.js'

logoutRouter.post('/', logout)

export default logoutRouter