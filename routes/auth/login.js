import express from 'express'
const loginRouter = express.Router();
import { login, loginOAuth } from '../../controllers/authController.js'
 /**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs user inside the sytem and starts a user session with JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User successfully logged in or user already logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginOutput'
 *       401:
 *         description: Invalid user or invalid username or password.
 *       500:
 *         description: Internal server error
 */
loginRouter.post('/', login)

//TODO: implement OAuth
loginRouter.post('/loginOAuth', loginOAuth) // implementation pending

export default loginRouter