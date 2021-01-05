const mongoose = require('mongoose')
const User = require('../models/user');
const Device = require('../models/device');

module.exports = {
    create: async (req, res) =>{
      const { name, channelId, imei } = req.body;
      const device = await Device.findOne({ imei })

      User.create({
          name,
          channelId,
          lastLogin: Date.now(),
          device: device._id
      }, function (err, user) {
        if (err) return res.status(400).send(err)

        return res.status(201).send(user)
      })
    },

    find: async (req, res) => {
      const { id } = req.params

      User.findById( id ).populate("device").exec((err, user) => {
        if (err) return res.status(400).send(err)

        return res.status(200).send(user)
      })
    }
}
