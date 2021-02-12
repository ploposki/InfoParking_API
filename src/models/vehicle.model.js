module.exports = (config, sequelize) => {
  return vehicle = config.define('vehicle', {
    companyId: {
      type: sequelize.INTEGER
    },
    model: {
      type: sequelize.STRING
    },
    plate: {
      type: sequelize.STRING
    },
    color: {
      type: sequelize.STRING
    },
    description: {
      type: sequelize.STRING
    }
  });
};
