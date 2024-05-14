import { constants } from '../utils/constants.js';
import { getUser, getUserProfiles, updateUserData, setProfileStatus } from '../models/userModel.js'

/**
 * desc: get individual loggedin user data
 * @param { * } req
 * @param { * } res
 */
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await getUser(id, req.app);
    if (!user) {
      return res.status(500).json({ message: "user doesnt exist" })
    }
    return res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

/**
 * desc: edit user data
 * @param { * } req
 * @param { * } res
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { username, id, firstName, lastName, email, bio, phone, photo } = req.body;
    // not updating id, password or role, seperate update call for status is present
    let user = {
      firstName,
      lastName,
      email,
      bio,
      phone,
      photo,
      username,
      role: "user"
    };
    user = updateUserData(id, user, req.app)
    if (!user) {
      return res.status(400).json({ message: "user not in db!" })
    }
    return res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    return res.status(500).json({ message: err })
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
    const user = await setProfileStatus(id, profile_status, req.app);
    if (!user) {
      return res.status(400).json({ message: "user not in db!" })
    }
    return res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

/**
 * desc: fetch others profiles depending on access level (admin vs normal user)
 * @param { * } req
 * @param { * } res
 */
export const getAllUserProfiles = async (req, res) => {
  try {
    const { role } = req.query;
    let user;
    if (role === constants.ADMIN) {
      user = await getUserProfiles(req.app, true);
    } else {
      user = await getUserProfiles(req.app);
    }
    if(!user) {
      return res.status(404).json(user)
    }
    return res.status(200).json(user);
  }
  catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export const deleteUserProfile = async (req, res) => {
  // Not in requirements
}
