var knex = require('../db/knex');

module.exports = {

  main: function(req, res, next) {
    res.redirect('/pokemon')
  }


};
