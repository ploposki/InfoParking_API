module.exports = (config, sequelize) => {
  return parking = config.define('parking', {
    companyId: {
      type: sequelize.INTEGER
    },
    operationId: {
      type: sequelize.INTEGER
    },
    vehicleId: {
      type: sequelize.INTEGER
    },
    amount: {
      type: sequelize.FLOAT
    },
    changedBy: {
      type: sequelize.INTEGER
    },
    finishedAt: {
      type: sequelize.DATE
    }
  });
};
