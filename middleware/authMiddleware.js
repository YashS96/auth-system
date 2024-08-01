import jwt from 'jsonwebtoken'

/**
 * desc: using JWT for login and session management
 * @param { * } req
 * @param { * } res
 * @param { * } next
 */
export const sessionJwtAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token, req.isAuthenticated(), req.session, req.isAuthenticated);
    if (!token && !req.isAuthenticated()) {
      return res.status(500).json({ message: "pls login first!" })
    }
    if (token) {
      const user = jwt.verify(token, process.env.SECRET); // AWS parameter store or secrets manager will also be a good choice to store secret
      req.user = user;
    } else if (req.isAuthenticated()) {
      console.log('logged in via ext provider.')
    }
    next();
  } catch (err) {
    res.clearCookie("token")
    console.log(err)
    return res.status(500).json(err)
  }
}


