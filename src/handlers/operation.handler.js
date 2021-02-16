const db      = require('../configs/db.config');
const auth    = require('./authorization.handler');

const operation = db.operation;
const company   = db.company;

exports.search = (req, res) => {

  auth.check(req, res, (data) => {
    company.findAll({
      where: (data.companyId == 1) ? {} : {
        id: data.companyId
      }
    }).then(c => {
      operation.findAll({
        where: (data.companyId == 1) ? {} : {
          companyId: data.companyId
        }
      }).then(o => {

        let operation = [];
        let company   = [];

        if(c) {
          c.forEach(x => {
            company.push({
              id:          x.id,
              name:        x.name,
              enable:      x.enable
            });
          });
        }

        if(o) {
          o.forEach(x => {
            operation.push({
              id:          x.id,
              companyId:   x.companyId,
              type:        x.type,
              time:        x.time,
              amount:      x.amount,
              enable:      x.enable
            });
          });
        }

        res.status(200).send({operation, company});
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the Operation."
        });
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Company."
      });
    });
  });
};

exports.insert = (req, res) => {

  auth.check(req, res, (data) => {
    operation.findOrCreate({
      where: (data.companyId == 1) ? {
        time:        req.body.payload.time,
        companyId:   req.body.payload.companyId
      } : {
        time:        req.body.payload.time,
        companyId:   data.companyId
      },
      defaults: {
        companyId:   (data.companyId == 1) ? req.body.payload.companyId : data.companyId,
        type:        req.body.payload.type,
        time:        req.body.payload.time,
        amount:      req.body.payload.amount,
        enable:      req.body.payload.enable,
        changedBy:   data.id
      }
    }).then(value => {
      if (JSON.parse(value.toString().split(',')[1])) {
        res.status(200).send({
          message: "Operation created successfully."
        });
      }
      else {
        operation.update({
          companyId:   (data.companyId == 1) ? req.body.payload.companyId : data.companyId,
          type:        req.body.payload.type,
          time:        req.body.payload.time,
          amount:      req.body.payload.amount,
          enable:      req.body.payload.enable,
          changedBy:   data.id
        }, {
          where: (data.companyId == 1) ? {
            time:        req.body.payload.time,
            companyId:   req.body.payload.companyId
          } : {
            time:        req.body.payload.time,
            companyId:   data.companyId
          },
        }).then(() => {
          res.status(200).send({
            message: "Operation updated successfully."
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the Operation."
          });
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Operation."
      });
    });
  });
};
