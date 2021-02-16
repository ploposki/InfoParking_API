const sequelize = require('sequelize');
const config = new sequelize('info-parking', 'info', 'Vaiseal@2020#', {
  host:           '45.15.24.171',
  dialect:          'mysql',
  timezone:        '-03:00',
  port:              3306,
  logging:           false,
  define: {
    freezeTableName: true,
    timestamps:      true
  }
});

module.exports = db = {
  sequelize:  sequelize,
  config:     config,

  access:     require('../models/access.model')    (config, sequelize),
  company:    require('../models/company.model')   (config, sequelize),
  operation:  require('../models/operation.model') (config, sequelize),
  parking:    require('../models/parking.model')   (config, sequelize),
  user:       require('../models/user.model')      (config, sequelize),
  vehicle:    require('../models/vehicle.model')   (config, sequelize),
};
