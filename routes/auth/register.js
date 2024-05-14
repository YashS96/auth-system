import express from 'express'
const registerRouter = express.Router();
import { register } from '../../controllers/authController.js'

registerRouter.post('/', register)

export default registerRouter