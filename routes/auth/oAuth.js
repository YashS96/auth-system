import express from "express";
import { authFailureCallback, authSuccessCallback, googleAuth, googleAuthRedirectURIs } from './Strategies/googleOAuthcallbacks.js'
const oAuthRouter = express.Router();
  /**
   * @swagger
   * /auth/google:
   *   get:
   *     summary: Redirect to Google OAuth
   *     description: Redirects the user to the Google OAuth consent screen
   *     responses:
   *       302:
   *         description: Redirect to Google OAuth
   */
oAuthRouter.get('/google', googleAuth);

 /**
   * @swagger
   * /auth/google/callback:
   *   get:
   *     summary: Google OAuth callback
   *     description: Handles the Google OAuth callback and redirects to the home page
   *     responses:
   *       200:
   *         description: Successful authentication
   *       401:
   *         description: Authentication failed
   */
oAuthRouter.get('/google/callback', googleAuthRedirectURIs);
oAuthRouter.get('/google/success', authSuccessCallback);
oAuthRouter.get('/google/failure', authFailureCallback);

export default oAuthRouter;