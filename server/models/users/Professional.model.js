const mongoose = require('mongoose')
const Schema = mongoose.Schema

const professionalSchema = new Schema({
  username: {type: String, require:true},
  email:    {type: String, require: true},
  password: {type: String, require: true},
  job:     {type: String, require: true},
  description: {type: String, require: true},
  localities: {type: String, require: true},
  spain: {type: Boolean, require: true},
  role: {
    type: String,
    enum: ['PROF', 'ADMIN'],
    default: 'PROF'
  },
  }, 
  {timestamps: true}
)

const Professional = mongoose.model('Professional', professionalSchema)
module.exports = Professional