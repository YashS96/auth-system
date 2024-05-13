import { jwt } from 'jsonwebtoken'

/**
 * desc: using JWT for login and session management
 * @param { * } req
 * @param { * } res
 * @param { * } next
 */
export const sessionJwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.SECRET); // AWS parameter store or secrets manager will also be a good choice to store secret
    req.user = user;
    next();

  } catch (err) {
    res.clearCookie("token")
    console.log(err)
    res.status(500).json(err)
  }
}


