import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid';
import { getExisitingUser, registerNewUser } from '../models/authModel.js'
// import { validations } from '../utils/validationService.js'

/**
 * login user, if creds match, otherwise reject login request.
 * @param { * } req
 * @param { * } res
 */
export const login = async (req, res) => {
  try {
    if (req.cookies?.token) {
      return res.status(200).json({ message: "user already logged in." });
    }
    const { username, password } = req.body;
    const user = await getExisitingUser(username, req.app);
    if (!user) {
      return res.status(401).json({ message: "Invalid username." });
    }
    // Compare password hash 
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    delete user.password;
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 15 * 60 }) // token expires in 15 mins
    res.cookie("token", token);

    return res.json({ message: "Login successful." });
  }
  catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

/**
 * desc: destroys the user session and logs out the user.
 * @param { * } req
 * @param { * } res
 */
export const logout = async (req, res) => {
  try {
    if (!req.cookies?.token) {
      return res.status(200).json({ message: "Already Logged out." })
    } else {
      res.clearCookie("token");
      return res.status(200).json({ message: "Logout successful." })
    }
  }
  catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Logout failed." })
  }
}

/**
 * desc: registers new users to the system, skips if user is exisiting in db.
 * @param { * } req
 * @param { * } res
 */
export const register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, bio, phone, photo, profile_status } = req.body;
    // Check if username or email is already taken 
    const existingUser = await getExisitingUser(username, req.app);
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }
    // auth and password management is safer if its Hashed or slated 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuid(),
      firstName,
      lastName,
      email,
      bio,
      phone,
      photo,
      username,
      password: hashedPassword,
      role: "user",
      profile_status
    };
    await registerNewUser(newUser, req.app);
    return res.status(200).json({ user: newUser });
  }
  catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export const loginOAuth = async (req, res) => {

}