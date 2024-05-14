import express from 'express'
const registerRouter = express.Router();
import { register } from '../../controllers/authController.js'

 /**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers new user (generates uuid and role automatically)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: returns users updated record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user doesnt exisit.
 *       500:
 *         description: Internal server error
 */
registerRouter.post('/', register)

export default registerRouter