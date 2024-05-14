import express from 'express'
const profileRouter = express.Router();
import { getUserProfile, updateUserProfile, setUserProfileStatus, getAllUserProfiles, } from '../../controllers/userProfileController.js'

profileRouter.get('/all', getAllUserProfiles)

profileRouter.get('/:id', getUserProfile)

profileRouter.post('/status', setUserProfileStatus)

profileRouter.post('/update', updateUserProfile)

export default profileRouter