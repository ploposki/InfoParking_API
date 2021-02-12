const db      = require('../configs/db.config');

const env     = require('dotenv').config();
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');

const user    = db.user;
const access  = db.access;
const company = db.company;

exports.login = (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
      return;
    }

    company.hasMany(user);
    user.belongsTo(company);

    access.hasMany(user);
    user.belongsTo(access);

    user.findOne({
      where: {
        login:    req.body.payload.login,
        password: crypto.pbkdf2Sync(
          req.body.payload.password,
          env.parsed.SALT,
          1000,
          64,
          'sha512'
        ).toString('hex'),
        enable:   true
      },
      include: [{
        model: access
      },
      {
        model: company,
        where: {
          enable: true
        }
      }]
    }).then(data => {
      if (data) {
        const token = jwt.sign({
          login: data.login,
          password: data.password
        }, env.parsed.TOKEN, { expiresIn: '6h' });

        user.update({ 
          jwt: token
        }, {
          where: {
            id: data.id
          },
        }).then(() => {
          res.status(200).send({
            user: {
              userId:      data.id,
              companyId:   data.companyId,
              name:        data.name,
              description: data.description
            },
            access: {
              accessId:    data.access.id,
              type:        data.access.type,
              json:        data.access.json
            },
            safety: {
              jwt:         token
            }
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while accessing User."
          });
        });
      }
      else {
        res.status(200).send({
          message: "The username or password is incorrect."
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User."
      });
    });
  }
  catch(err) {
    res.status(400).send({
      message: err.message || "Malformed syntax."
    });
  }
};

exports.check = (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
      return;
    }

    user.findOne({
      where: {
        id:  req.body.safety.userId
      },
    }).then(data => {
      if (data) {
        if (data.jwt === req.body.safety.jwt) {
          jwt.verify(req.body.safety.jwt, env.parsed.TOKEN, (err) => {
            if (err) {
              res.status(200).send({
                message: "Expired session."
              });
              return;
            }
  
            next(data);
          });
        }
        else {
          res.status(200).send({
            message: "Invalid access."
          });
        }
      }
      else {
        res.status(200).send({
          message: "Invalid access."
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while accessing User."
      });
    });
  }
  catch(err) {
    res.status(400).send({
      message: err.message || "Malformed syntax."
    });
  }
};
