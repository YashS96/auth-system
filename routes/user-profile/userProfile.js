import express from 'express'
const profileRouter = express.Router();
import { getUserProfile, updateUserProfile, setUserProfileStatus, getAllUserProfiles, } from '../../controllers/userProfileController.js'

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Fetch all user profiles. Users can only see public profiles, admins can see both private and public profiles. (only possible for logged in session)
 *     tags: [Profile]
 *     parameters:
 *      - in: query
 *        name: role
 *        required: true
 *        schema:
 *          type: string
 *        description: users role -admin or user (Front end should embed this and send)
 *     responses:
 *       200:
 *         description: User array object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
profileRouter.get('/all', getAllUserProfiles)

/**
 * @swagger
 * /user/{:id}:
 *   get:
 *     summary: Fetch users own data depending on Id. (only possible for logged in session)
 *     tags: [Profile]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: users own Id (Front end should embed this and send)
 *     responses:
 *       200:
 *         description: Fetches the users data by id.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500: 
 *         description: Internal Server Error
 */
profileRouter.get('/:id', getUserProfile)

 /**
 * @swagger
 * /user/status:
 *   post:
 *     summary: Set users profile status (only possible for logged in session)
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusUpdateInput'
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
profileRouter.post('/status', setUserProfileStatus)

/**
 * @swagger
 * /user/update:
 *   post:
 *     summary: Updates user data (only possible for logged in session)
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
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
profileRouter.post('/update', updateUserProfile)

export default profileRouter