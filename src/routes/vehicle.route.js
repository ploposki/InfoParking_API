const vehicle = require('../handlers/vehicle.handler');

module.exports = app => {
  app.post("/api/vehicle/search", vehicle.search);
  app.post("/api/vehicle/insert", vehicle.insert);
};
