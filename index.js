const db     = require('./src/configs/db.config');
const init   = require('./src/configs/init.config');
const router = require('./src/configs/router.config');

const method = require('method-override');
const serve  = require('serve-static');
const body   = require('body-parser');
const exp    = require('express');
const app    = exp();

app.set('port', process.env.PORT || 8100);

app.use(method());
app.use(serve('./site_content'));
app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.all('*',(_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(app.get('port'),() => {
  console.log('Server listening on port: ' + app.get('port'));
});

db.config.sync().then(() => {
  init.sync();
  router.attach(app);
});
