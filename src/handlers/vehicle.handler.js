const db      = require('../configs/db.config');
const auth    = require('./authorization.handler');

const vehicle = db.vehicle;

exports.search = (req, res) => {

  auth.check(req, res, (data) => {
    vehicle.findAll({
      where: (data.companyId == 1) ? {} : {
        companyId: data.companyId
      }
    }).then(v => {

      let vehicle = [];

      if(v) {
        v.forEach(x => {
          vehicle.push({
            id:          x.id,
            companyId:   x.companyId,
            model:       x.model,
            plate:       x.plate,
            color:       x.color,
            description: x.description,
            enable:      x.enable
          });
        });
      }

      res.status(200).send({vehicle});
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Vehicle."
      });
    });
  });
};

exports.insert = (req, res) => {

  auth.check(req, res, (data) => {
    vehicle.findOrCreate({
      where: (data.companyId == 1) ? {
        plate:       req.body.payload.plate,
        companyId:   req.body.payload.companyId
      } : {
        plate:       req.body.payload.plate,
        companyId:   data.companyId
      },
      defaults: {
        companyId:   (data.companyId == 1) ? req.body.payload.companyId : data.companyId,
        model:       req.body.payload.model,
        plate:       req.body.payload.plate,
        color:       req.body.payload.color,
        description: req.body.payload.description,
        enable:      req.body.payload.enable,
        changedBy:   data.id
      }
    }).then(value => {
      if (JSON.parse(value.toString().split(',')[1])) {
        res.status(200).send({
          message: "Vehicle created successfully."
        });
      }
      else {
        vehicle.update({
          companyId:   (data.companyId == 1) ? req.body.payload.companyId : data.companyId,
          model:       req.body.payload.model,
          color:       req.body.payload.color,
          description: req.body.payload.description,
          enable:      req.body.payload.enable,
          changedBy:   data.id
        }, {
          where: (data.companyId == 1) ? {
            plate:     req.body.payload.plate,
            companyId: req.body.payload.companyId
          } : {
            plate:     req.body.payload.plate,
            companyId: data.companyId
          },
        }).then(() => {
          res.status(200).send({
            message: "Vehicle updated successfully."
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the Vehicle."
          });
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Vehicle."
      });
    });
  });
};
