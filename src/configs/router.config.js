exports.attach = app => {
  require('../routes/company.route')  (app);
  require('../routes/user.route')     (app);
  require('../routes/vehicle.route')  (app);
};
