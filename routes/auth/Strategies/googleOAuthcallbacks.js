import passport from 'passport'

export const googleAuth = passport.authenticate('google', {
  scope:
    ['profile', 'email']
})

export const passportAuthenticate = (indentityProvider) => (passport.authenticate(indentityProvider, { failureRedirect: '/auth/google/failure' }));

export const authFailureCallback = (req, res) => (res.json({ message: "Failed to authenticate.." }));

export const authSuccessCallback = (req, res) => (res.json({ message: "Login successful." }));

