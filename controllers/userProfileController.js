import { constants } from './constants';
import { getUser, getUserProfiles ,updateUserData, getProfileStatus, setProfileStatus } from '../models/userModel'

/**
 * desc: get individual loggedin user data
 * @param { * } req
 * @param { * } res
 */
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await getUser(id, app);
    res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

/**
 * desc: edit user data
 * @param { * } req
 * @param { * } res
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { username, id, firstName, lastName, email, bio, phone, photo, profile_status } = req.body;
    const user = {
      id,
      firstName,
      lastName,
      email,
      bio,
      phone,
      photo,
      username,
      role: "user",
      profile_status
    };
    user = updateUserData(user, app)
    return res.json(user.value()); 
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

/**
 * desc: set user profile status to public or private
 * @param { * } req
 * @param { * } res
 */
export const setUserProfileStatus = async (req, res) => {
  try {
    const { id, profile_status } = req.body;
    const user = await setProfileStatus(id, profile_status, app);
    res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

/**
 * desc: fetch others profiles depending on access level (admin vs normal user)
 * @param { * } req
 * @param { * } res
 */
export const getAllUserProfiles = async (req, res) => {
  try {
    const { id, role } = req.body;
    let user;
    if (role === constants.ADMIN) {
       user = await getUserProfiles(app, true);
    } else {
       user = await getUserProfiles(app);
    }
    res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

export const deleteUserProfile = async (req, res) => {
  // Not in requirements
}
