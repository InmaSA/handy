const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer')

const CalendarEvents  = require('../models/CalendarEvents.model')
const Professional = require('../models/users/Professional.model')

router.post('/postEvents', (req, res) => {
    CalendarEvents.create(req.body)
        .then(theNewEvent => {
            res.json(theNewEvent)

            Professional.findOne({_id: theNewEvent.professionalId})
            .then(theProf => { 
                const profEmail = theProf.email 
            
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: `${process.env.EMAIL}`,
                        pass: `${process.env.PASSWORD}`
                    }
                })

                transporter.sendMail({
                    from: 'Handy <noreply@handy.com>',
                    to: profEmail,
                    subject: 'Tienes un nuevo evento en tu agenda',
                    html: `${theNewEvent.particularName} quiere saber tu disponibilidad para el día ${theNewEvent.date}.
                     Por favor contacta llamando al ${theNewEvent.particularPhone}.
                      Puedes ver el evento entrando en <a href="http://localhost:3000/professional/profile">tu perfil</a>`
                    })
                    .then(info => console.log(info))
                    .catch(error => console.log(error))
            
            })      
        
        })
        .catch(err => console.log('Error', err))
})



router.get('/getProfEvents/:profId', (req, res) => {
    CalendarEvents.find({professionalId: req.params.profId })
    .then(allEvents => res.json(allEvents))
    .catch(err => console.log('Error', err))
})



module.exports = router






