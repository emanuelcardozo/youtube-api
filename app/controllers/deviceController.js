const Device = require('../models/device');

module.exports = {
    create: async (req, res) =>{
      const { androidId, model } = req.body;

      Device.create({
          androidId,
          model
      }, function (err, device) {
        if (err) return res.status(400).send(err)

        return res.status(201).send(device)
      })
    },

    find: async (req, res) => {
      const { id } = req.params

      Device.findById(id).populate("user").exec((err, device) =>{
        if (err) return res.status(400).send(err)

        return res.status(200).send(device)
      })
    },

    findByAndroidId: async (req, res) => {
      const { androidId } = req.body

      Device.findOne({ androidId }).populate("user").exec((err, device) =>{
        if (err) return res.status(400).send(err)

        return res.status(200).send(device)
      })
    }
}
