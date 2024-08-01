import express from "express";
import { authFailureCallback, authSuccessCallback, googleAuth, passportAuthenticate } from './Strategies/googleOAuthcallbacks.js'
import { Passport } from "passport";
const oAuthRouter = express.Router();
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google OAuth
 *     tags: [OAuth2.0]
 *     description: Redirects the user to the Google OAuth consent screen
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
oAuthRouter.get('/google', googleAuth);

oAuthRouter.get('/google/callback', passportAuthenticate('google'), (req, res) => {
  req.session.save(() => {
    res.redirect('/auth/google/success')
  })
}
);
oAuthRouter.get('/google/success', authSuccessCallback);
oAuthRouter.get('/google/failure', authFailureCallback);

export default oAuthRouter;