const user = require('../handlers/user.handler');
const auth = require('../handlers/authorization.handler');

module.exports = app => {
  app.post("/api/user/login",  auth.login);
  app.post("/api/user/search", user.search);
  app.post("/api/user/insert", user.insert);
};
