import express from 'express'
const logoutRouter = express.Router();
import { logout } from '../../controllers/authController.js'

 /**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out an already logged in User.
 *     tags: [Auth]
 *     parameters:
 *        - in: cookie
 *          name: token
 *     responses:
 *       200:
 *         description: Logs out a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginOutput'
 *       401:
 *         description: Invalid user or invalid username or password.
 *       500:
 *         description: Internal server error
 */
logoutRouter.post('/', logout)

export default logoutRouter