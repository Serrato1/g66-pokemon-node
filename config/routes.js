//Update the name of the controller below and rename the file.
let index = require("../controllers/index.js");
let pokemon = require('../controllers/pokemon.js')
let trainers = require('../controllers/trainers.js')
let gym = require('../controllers/gym.js')

module.exports = function(app){

  app.get('/', index.main);

  app.get('/pokemon',pokemon.main);
  app.get('/pokemon/create',pokemon.form)
  app.get('/pokemon/update/:id',pokemon.formUpdate);
  app.get('/pokemon/delete/:id',pokemon.delete);
  app.post('/pokemon/create',pokemon.create);
  app.post('/pokemon/update',pokemon.update);

  app.get('/gym',gym.main);
  app.get('/gym/reset',gym.reset);
  app.get('/gym/add/:id',gym.addGym);
  app.post('/gym/add',gym.postAddGym);
  app.get('/gym/remove/:id',gym.removeGym);
  app.get('/gym/battle/:pokemon1/:pokemon2',gym.battle)


  app.get('/trainers',trainers.main);
  app.get('/trainers/:id',trainers.info);




  app.get('/pokemon/:id',pokemon.info)

}
