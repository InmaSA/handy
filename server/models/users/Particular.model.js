const mongoose = require('mongoose')
const Schema = mongoose.Schema

const particularSchema = new Schema({
  username: {type: String, require:true},
  email:    {type: String, require: true},
  password: {type: String, require: true},

  }, 
  {timestamps: true}
)

const Particular = mongoose.model('Particular', particularSchema)
module.exports = Particular
