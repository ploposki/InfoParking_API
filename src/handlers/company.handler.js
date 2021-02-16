const db      = require('../configs/db.config');
const auth    = require('./authorization.handler');

const company = db.company;

exports.search = (req, res) => {

  auth.check(req, res, (data) => {
    company.findAll({
      where: (data.companyId == 1) ? {} : {
        id: data.companyId
      }
    }).then(c => {

      let company = [];

      if(c) {
        c.forEach(x => {
          company.push({
            id:                  x.id,
            name:                x.name,
            businessName:        x.businessName,
            registerNumber:      x.registerNumber,
            registerStateNumber: x.registerStateNumber,
            address:             x.address,
            district:            x.district,
            city:                x.city,
            state:               x.state,
            zipcode:             x.zipcode,
            phone:               x.phone,
            email:               x.email,
            enable:              x.enable
          });
        });
      }

      res.status(200).send({company});
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Company."
      });
    });
  });
};

exports.insert = (req, res) => {

  auth.check(req, res, (data) => {
    company.findOrCreate({
      where: (data.companyId == 1) ? {
        registerNumber:      req.body.payload.registerNumber
      } : {
        id:                  data.companyId
      },
      defaults: {
        name:                req.body.payload.name,
        businessName:        req.body.payload.businessName,
        registerNumber:      req.body.payload.registerNumber,
        registerStateNumber: req.body.payload.registerStateNumber,
        address:             req.body.payload.address,
        district:            req.body.payload.district,
        city:                req.body.payload.city,
        state:               req.body.payload.state,
        zipcode:             req.body.payload.zipcode,
        phone:               req.body.payload.phone,
        email:               req.body.payload.email,
        enable:              req.body.payload.enable,
        changedBy:           data.id
      }
    }).then(value => {
      if (JSON.parse(value.toString().split(',')[1])) {
        res.status(200).send({
          message: "Company created successfully."
        });
      }
      else {
        company.update({ 
          name:                req.body.payload.name,
          businessName:        req.body.payload.businessName,
          address:             req.body.payload.address,
          district:            req.body.payload.district,
          city:                req.body.payload.city,
          state:               req.body.payload.state,
          zipcode:             req.body.payload.zipcode,
          phone:               req.body.payload.phone,
          email:               req.body.payload.email,
          enable:              req.body.payload.enable,
          changedBy:           data.id
        }, {
          where: (data.companyId == 1) ? {
            registerNumber:    req.body.payload.registerNumber
          } : {
            id:                data.companyId
          },
        }).then(() => {
          res.status(200).send({
            message: "Company updated successfully."
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the Company."
          });
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Company."
      });
    });
  });
};

exports.default = (obj) => {
  company.findOrCreate({
    where: {
      id:                  obj.id,
    },
    defaults: {
      id:                  obj.id,
      name:                obj.name,
      businessName:        obj.businessName,
      registerNumber:      obj.registerNumber,
      registerStateNumber: obj.registerStateNumber,
      address:             obj.address,
      district:            obj.district,
      city:                obj.city,
      state:               obj.state,
      zipcode:             obj.zipcode,
      phone:               obj.phone,
      email:               obj.email,
      enable:              obj.enable
    }
  }).catch(() => {
    console.log("Some error occurred while checking the Company.");
  });
};
