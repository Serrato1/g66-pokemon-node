let knex = require('../db/knex');

module.exports = {
  main: function(req,res){
    knex("trainers")
    .then((result)=>{
      res.render('trainers',{trainerObj : result})
    })
  },
  info: function(req,res){
    knex("trainers")
    .where('trainers.id',req.params.id)
    .then((result)=>{
      knex("pokemon")
      .where('pokemon.trainer_id', result[0].id )
      .then((response)=>{
        res.render('trainer_info',{trainerObj : result[0], pokemonObj : response } )
      })
    })
  }
}
