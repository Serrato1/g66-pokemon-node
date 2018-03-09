let knex = require('../db/knex');

module.exports = {

  main: function(req,res){
    if(!req.session.gym){
      req.session.gym = [];
    }
    knex("pokemon")
    .then((result)=>{
      res.render('gym' , {gym : req.session.gym , pokemonObj : result , winner: false})
    })
  }
  ,
  reset: function(req,res){
    req.session.gym = [];
    req.session.save(()=>{
      knex("pokemon")
      .update({
        in_gym : false
      })
      .then((response)=>{
        res.redirect('/gym');
      })

    });
  },
  addGym: function(req,res){
    if(req.session.gym.length == 2){
      res.send("GYM IS FULL")
    }else{
      req.session.gym.push(req.params.id);
      req.session.save((result)=>{
      });
      knex("pokemon")
      .where('pokemon.id',req.params.id)
      .update({
        in_gym : true
      })
      .then((response)=>{
        res.redirect('/pokemon');
      })
    }
  },
  postAddGym: function(req,res){
    if(req.session.gym.length === 1){
      var pokemon_1 = req.session.gym[0];
      var pokemon_2 = req.body.slot2;
      req.session.gym.push(pokemon_2);
      req.session.save(()=>{
        knex("pokemon")
        .where('pokemon.id',pokemon_2)
        .update({
          in_gym : true
        })
        .then(()=>{
          res.redirect("/gym");
        })
      })
    }else{
      var pokemon_1 = req.body.slot1;
      var pokemon_2 = req.body.slot2;
      req.session.gym.push(pokemon_1);
      req.session.gym.push(pokemon_2);
      req.session.save(function(){
        knex("pokemon")
        .where('pokemon.id',pokemon_1)
        .update({
          in_gym : true
        })
        .then(()=>{
        })
        knex("pokemon")
        .where('pokemon.id',pokemon_2)
        .update({
          in_gym : true
        })
        .then(()=>{
          res.redirect('/gym');
        })
      })

    }
  },
  removeGym: function(req,res){
    let pokeId = req.params.id;
    let location = req.session.gym.indexOf(pokeId);
    req.session.gym.splice(location,1);
    req.session.save((result)=>{
    });
    knex("pokemon")
    .where('pokemon.id',pokeId)
    .update({
      in_gym : false
    })
    .then((response)=>{
      res.redirect('/pokemon')
    })

  },
  battle: function(req,res){
    knex("pokemon")
    .where('pokemon.id',req.params.pokemon1)
    .orWhere('pokemon.id',req.params.pokemon2)
    .then((result)=>{
      let champion = result[0].cp > result[1].cp ? result[0].name : result[1].name;
      res.render('gym' , {gym : req.session.gym , pokemonObj : [], winner: champion})
    })


  }

}
