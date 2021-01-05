const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  model: String,
  imei: {
    type: String,
    required: true,
    unique: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true
  }
},
{
  timestamps:true
})

module.exports = mongoose.model('Device', DeviceSchema)
