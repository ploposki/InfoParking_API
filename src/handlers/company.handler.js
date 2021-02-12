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
