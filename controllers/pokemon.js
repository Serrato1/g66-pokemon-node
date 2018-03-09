let knex = require('../db/knex');
let Pokemon = require('pokemon-images')
module.exports = {
  main: function(req,res){
    if(!req.session.gym){
      req.session.gym = [];
    }
    knex("pokemon")
    .then((result)=>{
      res.render("pokemon",{
         showPokemonForm: false,
         updatePokemon : false,
         pokemonObj : result
       });
    })
  },
  form: function(req,res){
    knex("pokemon")
    .then((result)=>{
      res.render("pokemon", {
         showPokemonForm: true,
         updatePokemon : false,
         pokemonObj : result
       });
    })
  },
  formUpdate: function(req,res){
    knex("pokemon")
    .then((result)=>{
      let chosenPokemon = 'not_found'
      result.forEach((pokemon)=>{
        if(pokemon.id == req.params.id){
          chosen_pokemon = pokemon;
        }
      })
      knex("trainers")
      .then((trainer_result)=>{
        res.render("pokemon", {
           showPokemonForm: true,
           pokemonObj : result,
           updatePokemon : chosen_pokemon,
           trainers: trainer_result
         });
      })

    })
  },
  update: function(req,res){
    knex("pokemon")
    .where('pokemon.id',req.body.id)
    .update({
      name: req.body.name,
      trainer_id: req.body.trainer_id,
      cp: req.body.cp
    })
    .then((result)=>{
      res.redirect('/');
    })
  },
  delete: function(req,res){
    knex("pokemon")
    .where('pokemon.id',req.params.id)
    .del()
    .then((result)=>{
      res.redirect('/pokemon');
    })
  },
  create: function(req,res){
    knex("pokemon")
    .insert({
      name        : req.body.name,
      trainer_id  : req.body.trainer_id,
      cp          : req.body.cp,
      in_gym      : false
    })
    .then((result)=>{
      res.redirect('/pokemon');
    })
  },
  info: function(req,res){
    let pokemon_id = req.params.id;
    knex("pokemon")
    .select("*","pokemon.name AS pokemon_name"  , "trainers.name AS trainer_name")
    .innerJoin("trainers",'pokemon.trainer_id','trainers.id')
    .where('pokemon.id', pokemon_id)
    .then((result)=>{
      let pokemon_name = result[0].pokemon_name.toLowerCase();
      try {
        var pokemon_img = Pokemon.getSprite(pokemon_name)
      }catch(err){
        var pokemon_img = 'none';
        console.log(err);
      }
      res.render('pokemon_info',{pokemonInfo : result[0], pokeImg: pokemon_img });
    })
  }

}
