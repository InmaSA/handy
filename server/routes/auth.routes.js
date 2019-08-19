const express    = require('express')
const authRoutes = express.Router()

const passport   = require('passport')
const bcrypt     = require('bcryptjs')
// const nodemailer = require('nodemailer')


const Particular    = require('../models/users/Particular.model')


authRoutes.post('/particular/signup', (req, res, next) => {

    const { username, email, password } = req.body
  
    if (!username || !password) {
      res.status(400).json({ message: 'Por favor, introduce tu email y una contraseña' })
      return
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' })
        return
    }
  
    Particular.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Algo salió mal en la comprobación del usuario, inténtalo de nuevo"})
            return
        }
        if (foundUser) {
            res.status(400).json({ message: 'Ya existe un usuario registrado con este nombre' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        // // creamos un código aleatorio para el token de confirmación que se enviará por email

        // const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        // let token = ''
        // for (let i = 0; i < 25; i++) {
        // token += characters[Math.floor(Math.random() * characters.length )]
        // }

  
        const NewPart = new Particular({
            username:username,
            email: email,
            password: hashPass,
            // confirmationCode: token
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

        // // configuramos nodemailer para el envío del email de confirmación

        // let transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: `${process.env.EMAIL}`,
        //         pass: `${process.env.PASSWORD}`
        //     }
        //   })
  
        // transporter.sendMail({
        // from: 'Handy <noreply@handy.com>',
        // to: email,
        // subject: 'Código de validación de cuenta de usuario en Handy',
        // html: `Bienvenid@ a Handy. Por favor valida tu cuenta haciendo click <a href=http://localhost:5000/api/particular/confirm/${token}>en este enlace</a>.`
        // })
        // .then(info => console.log(info))
        // .catch(error => console.log(error))

    })
})


// // ruta de validación del email

// authRoutes.get('/particular/confirm/:confirmationCode', (req,res,next) =>{
//     Particular.findOneAndUpdate({confirmationCode: req.params.confirmationCode}, status='Active')
//     .then( elm => {
//     //   elm.status = 'Active'
//       console.log(elm)
//     //   res.redirect('/auth/particular/login')
//     })
//   })



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

          res.status(200).json(theUser)
      })    
  })(req, res, next);
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