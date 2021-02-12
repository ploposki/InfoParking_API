const db      = require('../configs/db.config');
const auth    = require('./authorization.handler');

const env     = require('dotenv').config();
const crypto  = require('crypto');

const user    = db.user;
const access  = db.access;
const company = db.company;

exports.search = (req, res) => {

  auth.check(req, res, (data) => {
    company.findAll({
      where: (data.companyId == 1) ? {} : {
        id: data.companyId
      }
    }).then(c => {

      access.findAll().then(a => {

        user.findAll({
          where: (data.companyId == 1) ? {} : {
            companyId: data.companyId
          }
        }).then(u => {

          let user    = [];
          let access  = [];
          let company = [];

          if(c) {
            c.forEach(x => {
              company.push({
                id:          x.id,
                name:        x.name,
                enable:      x.enable
              });
            });
          }

          if(u) {
            u.forEach(x => {
              user.push({
                id:          x.id,
                companyId:   x.companyId,
                accessId:    x.accessId,
                name:        x.name,
                description: x.description,
                login:       x.login,
                enable:      x.enable
              });
            });
          }

          if(a) {
            a.forEach(x => {
              access.push({
                id:          x.id,
                type:        x.type,
                enable:      x.enable
              });
            });
          }

          res.status(200).send({user, access, company});
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving the User."
          });
        });
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the Access."
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

  auth.check(req, res, (_data) => {
    user.findOrCreate({
      where: {
        companyId:   req.body.payload.companyId,
        login:       req.body.payload.login,
      },
      defaults: {
        companyId:   req.body.payload.companyId,
        accessId:    req.body.payload.accessId,
        name:        req.body.payload.name,
        description: req.body.payload.description,
        login:       req.body.payload.login,
        password:    crypto.pbkdf2Sync(
          req.body.payload.password,
          env.parsed.SALT,
          1000,
          64,
          'sha512'
        ).toString('hex'),
        enable:      req.body.payload.enable
      }
    }).then(value => {
      if (JSON.parse(value.toString().split(',')[1])) {
        res.status(200).send({
          message: "User created successfully."
        });
      }
      else {
        user.update({ 
          companyId:   req.body.payload.companyId,
          accessId:    req.body.payload.accessId,
          name:        req.body.payload.name,
          description: req.body.payload.description,
          login:       req.body.payload.login,
          password:    crypto.pbkdf2Sync(
            req.body.payload.password,
            env.parsed.SALT,
            1000,
            64,
            'sha512'
          ).toString('hex'),
          enable:      req.body.payload.enable
        }, {
          where: {
            companyId: req.body.payload.companyId,
            login:     req.body.payload.login,
          },
        }).then(() => {
          res.status(200).send({
            message: "User updated successfully."
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
          });
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
  });
};

exports.default = (obj) => {
  user.findOrCreate({
    where: {
      id:          obj.id,
    },
    defaults: {
      companyId:   obj.companyId,
      accessId:    obj.accessId,
      name:        obj.name,
      description: obj.description,
      login:       obj.login,
      password:  crypto.pbkdf2Sync(
        obj.password,
        env.parsed.SALT,
        1000,
        64,
        'sha512'
      ).toString('hex'),
      enable:      obj.enable
    }
  }).catch(() => {
    console.log("Some error occurred while checking the User.");
  });
};

exports.access = (obj) => {
  access.findOrCreate({
    where: {
      id:          obj.id,
    },
    defaults: {
      id:          obj.id,
      type:        obj.type,
      enable:      obj.enable,
      json:        obj.json
    }
  }).catch(() => {
    console.log("Some error occurred while checking the Access.");
  });
};
