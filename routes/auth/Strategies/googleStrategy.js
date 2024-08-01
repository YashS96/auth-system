import passport from 'passport';
import dotenv from 'dotenv'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_CALLBACK_URI = process.env.SERVER_CALLBACK_URI;

passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: SERVER_CALLBACK_URI
},
	function (request, accessToken, refreshToken, profile, done) {
		return done(null, profile);
	})
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
