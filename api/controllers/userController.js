// const mongoose = require('mongoose')
const User = require('../models/user');
const Device = require('../models/device');

module.exports = {
    create: async (req, res) =>{
      const { name, channelId, androidId } = req.body;
      const device = await Device.findOne({ androidId })

      User.create({
          name,
          channelId,
          lastLogin: Date.now(),
          device: device._id
      }, async function (err, user) {
        if (err) return res.status(400).send(err)

        device.user = user._id
        await device.save()

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
