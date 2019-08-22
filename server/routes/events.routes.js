const express = require('express');
const router = express.Router();

const CalendarEvents  = require('../models/CalendarEvents.model')

router.post('/postEvents', (req, res) => {
    CalendarEvents.create(req.body)
        .then(theNewEvent => res.json(theNewEvent))
        .catch(err => console.log('Error', err))
})

module.exports = router