import passport from 'passport'

export const googleAuth = passport.authenticate('google', {
  scope:
    ['email', 'profile']
})

export const googleAuthRedirectURIs = passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  })

export const authFailureCallback = (req, res) => (res.json({ message: "Failed to authenticate.." }));

export const authSuccessCallback = (req, res) => (res.json({ message: "Login successful." }));

