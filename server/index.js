const debug = process.env.NODE_ENV === 'dev';

module.exports = () => {
  if (debug) console.log('user joined room #' + room);

  const initConf = {
    init: function () {
      this._addingCity();
    },

    _addingCity: function (cityAdded) {
      //initConfFunc._addingCity(cityAdded);
      console.log('Hey !');
    }
  };

  initConf.init();
};
