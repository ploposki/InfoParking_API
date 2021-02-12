const user    = require('../handlers/user.handler');
const company = require('../handlers/company.handler');

exports.sync = () => {
  user.default({
    id:                   1,
    companyId:            1,
    accessId:             1,
    name:                'Admin',
    description:         'default',
    login:               '123',
    password:            '123',
    enable:               true
  });

  user.access({
    id:                   1,
    type:                'admin',
    enable:               true,
    json: [
      {
        title:           'home',
        url:             '/home',
        icon:            'home'
      },
      {
        title:           'exit',
        url:             '/login',
        icon:            'arrow-redo'
      }
    ]
  });

  user.access({
    id:                   2,
    type:                'standard',
    enable:               true,
    json: [
      {
        title:           'home',
        url:             '/home',
        icon:            'home'
      },
      {
        title:           'exit',
        url:             '/login',
        icon:            'arrow-redo'
      }
    ]
  });

  user.access({
    id:                   3,
    type:                'manager',
    enable:               true,
    json: [
      {
        title:           'home',
        url:             '/home',
        icon:            'home'
      },
      {
        title:           'exit',
        url:             '/login',
        icon:            'arrow-redo'
      }
    ]
  });

  company.default({
    id:                   1,
    name:                'Main',
    businessName:        'default',
    registerNumber:      'default',
    registerStateNumber: 'default',
    address:             'default',
    district:            'default',
    city:                'default',
    state:               'default',
    zipcode:             'default',
    phone:               'default',
    email:               'default',
    enable:               true
  });

};
