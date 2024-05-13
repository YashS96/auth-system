const express = require('express');
const profileRouter = express.Router();
import { getUserProfile, updateUserProfile, setUserProfileStatus, getAllUserProfiles, } from '../../controllers/userProfileController'

profileRouter.get('/all', getAllUserProfiles)

profileRouter.get('/:id', getUserProfile)

profileRouter.post('/status', setUserProfileStatus)

profileRouter.post('/', updateUserProfile)

export default profileRouter