const operation = require('../handlers/operation.handler');

module.exports = app => {
  app.post("/api/operation/search", operation.search);
  app.post("/api/operation/insert", operation.insert);
};
