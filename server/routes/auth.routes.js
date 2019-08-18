const express    = require('express')
const authRoutes = express.Router()

const passport   = require('passport')
const bcrypt     = require('bcryptjs')


const Particular    = require('../models/users/Particular.model')


authRoutes.post('/particular/signup', (req, res, next) => {
    const email    = req.body.email
    const username = req.body.username
    const password = req.body.password
  
    if (!email || !password) {
      res.status(400).json({ message: 'Por favor, introduce tu email y una contraseña' })
      return
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' })
        return
    }
  
    Particular.findOne({ email }, (err, foundEmail) => {

        if(err){
            res.status(500).json({message: "Algo salió mal en la comprobación del correo, inténtalo de nuevo"})
            return
        }

        if (foundEmail) {
            res.status(400).json({ message: 'Ya existe un usuario registrado con este email' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)
  
        const NewPart = new Particular({
            username:username,
            email: email,
            password: hashPass,
        });
  
        NewPart.save(err => {
            if (err) {
                res.status(400).json({ message: 'Algo no ha ido bien al guardar tus datos en nuestra base de datos, por favor inténtalo de nuevo' })
                return
            }
            req.login(NewPart, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Algo no ha ido bien en el proceso de acceso tras el registro.' })
                    return
                }          
                res.status(200).json(NewPart)
            })
        })
    })
})

authRoutes.post('/particular/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo en la autenticación del usuario.' });
          return
      }
  
      if (!theUser) {

          res.status(401).json(failureDetails);
          return;
      }

      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo al guardar la sesión .' })
              return;
          }
      })    
  })
})


authRoutes.post('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({ message: 'Log out success!' })
});


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'No tienes acceso. Entra con tu cuenta o regístrate como nuevo usuario' })
});




module.exports = authRoutes