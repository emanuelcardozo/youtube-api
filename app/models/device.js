const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  model: String,
  androidId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps:true
})

module.exports = mongoose.model('Device', DeviceSchema)
