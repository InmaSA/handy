const express = require('express');
const router = express.Router();

const Professional  = require('../models/users/Professional.model')
const Particular    = require('../models/users/Particular.model')


router.get('/search/:job', (req, res) => {
    Professional.find()
    .then(allProfessionals => {
      let show = []
        if (req.params.job === 'hogar') {
            allProfessionals.forEach(elm => {
                switch (elm.job) {
                  case 'albañilería': case 'costura': case 'cuidado de mascotas': case 'cuidado de personas':
                  case 'electricidad': case 'fontanería': case 'informática': case 'jardinería': 
                  case 'limpieza del hogar': case 'pintura': case 'reformas': case 'clases particulares':

                  show.push(elm)
                  break
                } 
            })
        }      
        if (req.params.job === 'salud') {
          allProfessionals.forEach(elm => {
              switch (elm.job) {
                case 'cuidado de personas': case 'fisioterapia': case 'maquillaje profesional':
                case 'peluquería y estética': 
                 
                show.push(elm)
                break
              } 
          })
        } 
        if (req.params.job === 'eventos') {
          allProfessionals.forEach(elm => {
              switch (elm.job) {
                case 'animador sociocultural': case 'catering': case 'maquillaje profesional':
                case 'música y espectáculos': case 'peluquería y estética': case 'personal shoper':
                case 'costura':
                 
                show.push(elm)
                break
              } 
          })
        } 
        if (req.params.job === 'cultura') {
          allProfessionals.forEach(elm => {
              switch (elm.job) {
                case 'animador sociocultural': case 'clases particulares': case 'maquillaje profesional':
                case 'música y espectáculos': case 'guía turístico': case 'personal shoper':
                 
                show.push(elm)
                break
              } 
          })
        } 

        res.json(show)   
    })
    .catch(err => console.log('Error', err))
})


router.get('/update-favourites/part/:partId/prof/:profId', (req, res) => {

  Particular.findByIdAndUpdate(req.params.partId, { $push: { favourites: req.params.profId } }, { new: true })
  .then(theParticular => console.log(theParticular))
  .catch(error => console.log(error))
})


router.get('/remove-favourites/part/:partId/prof/:profId', (req, res) => {

  Particular.findByIdAndUpdate(req.params.partId, { $pull: { favourites: req.params.profId } }, { new: true })
  .then(theParticular => console.log(theParticular))
  .catch(error => console.log(error))
})

module.exports = router