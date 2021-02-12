module.exports = (config, sequelize) => {
  return access = config.define('access', {
    type: {
      type: sequelize.ENUM,
      values: [
        'admin',
        'standard',
        'manager'
      ]
    },
    enable: {
      type: sequelize.BOOLEAN
    },
    json: {
      type: sequelize.JSON
    }
  });
};
