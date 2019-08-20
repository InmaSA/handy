# handy

passport.serializeUser((loggedInUser, cb) => {
  
  cb(null, (loggedInUser._id, loggedInUser.role))
});

passport.deserializeUser((userIdFromSession, userRoleFromSession, cb) => {

  if (userRoleFromSession == 'PART') {
    Particular.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err)
        return
      }
      cb(null, userDocument);
    })
    } else if (userRoleFromSession == 'PROF') {
        Professional.findById(userIdFromSession, (err, userDocument) => {
          if (err) {
            cb(err)
            return
          }
          cb(null, userDocument);
        })
      } 
})
