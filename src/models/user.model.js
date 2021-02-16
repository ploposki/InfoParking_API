module.exports = (config, sequelize) => {
  return user = config.define('user', {
    companyId: {
      type: sequelize.INTEGER
    },
    accessId: {
      type: sequelize.INTEGER
    },
    name: {
      type: sequelize.STRING
    },
    description: {
      type: sequelize.STRING
    },
    login: {
      type: sequelize.STRING
    },
    password: {
      type: sequelize.STRING
    },
    enable: {
      type: sequelize.BOOLEAN
    },
    jwt: {
      type: sequelize.JSON
    },
    changedBy: {
      type: sequelize.INTEGER
    }
  });
};
