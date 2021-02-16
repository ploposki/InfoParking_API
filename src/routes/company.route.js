const company = require('../handlers/company.handler');

module.exports = app => {
  app.post("/api/company/search", company.search);
  app.post("/api/company/insert", company.insert);
};
