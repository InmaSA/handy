const mongoose = require('mongoose')
const Schema = mongoose.Schema

const particularSchema = new Schema({
  username: {type: String, require:true},
  email:    {type: String, require: true},
  password: {type: String, require: true},
  role: {
    type: String,
    enum: ['PART', 'ADMIN'],
    default: 'PART'
  },
  // status: {
  //           type: String,
  //           enum: ['Pending Confirmation', 'Active'],
  //           default: 'Pending Confirmation'
  // },
  // confirmationCode: String,

  }, 
  {timestamps: true}
)

const Particular = mongoose.model('Particular', particularSchema)
module.exports = Particular
