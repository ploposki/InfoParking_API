module.exports = (config, sequelize) => {
  return operation = config.define('operation', {
    companyId: {
      type: sequelize.INTEGER
    },
    type: {
      type: sequelize.ENUM,
      values: [
        'daily',
        'period'
      ]
    },
    time: {
      type: sequelize.TIME
    },
    amount: {
      type: sequelize.FLOAT
    },
    enable: {
      type: sequelize.BOOLEAN
    },
    changedBy: {
      type: sequelize.INTEGER
    }
  });
};
