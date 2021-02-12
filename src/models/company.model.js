module.exports = (config, sequelize) => {
  return company = config.define('company', {
    name: {
      type: sequelize.STRING
    },
    businessName: {
      type: sequelize.STRING
    },
    registerNumber: {
      type: sequelize.STRING
    },
    registerStateNumber: {
      type: sequelize.STRING
    },
    address: {
      type: sequelize.STRING
    },
    district: {
      type: sequelize.STRING
    },
    city: {
      type: sequelize.STRING
    },
    state: {
      type: sequelize.STRING
    },
    zipcode: {
      type: sequelize.STRING
    },
    phone: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING
    },
    enable: {
      type: sequelize.BOOLEAN
    }
  });
};
