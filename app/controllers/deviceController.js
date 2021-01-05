const Device = require('../models/device');

module.exports = {
    create: async (req, res) =>{
      const { imei, model, serialNumber } = req.body;
      const device = await Device.create({
          imei,
          model,
          serialNumber
      }, function (err, device) {
        if (err) return res.status(400).send(err)

        return res.status(201).send(device)
      })
    },

    find: async (req, res) => {
      const { id } = req.params
      await Device.findById(id).populate("user").exec((err, device) =>{
        if (err) return res.status(400).send(err)

        return res.status(200).send(device)
      })
    }
}
