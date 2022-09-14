import 'bootstrap/dist/js/bootstrap.bundle';
window.bootstrap = require("bootstrap");

import(/* webpackChunkName: "js/base" */ './base.js').then(home => {
  home.initHome();
});
