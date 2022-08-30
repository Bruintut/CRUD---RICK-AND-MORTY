const route = require('express').Router();
const controllerCharacters = require('../characters/characters.controller')

route.get('/find-characters', controllerCharacters.findAllCharactersController);
route.get('/find-character/:id', controllerCharacters.findByIdCharacterController);
route.get('/search', controllerCharacters.searchCharacterController);
route.post('/create', controllerCharacters.createCharacterController);
route.put('/update/:id', controllerCharacters.updateCharacterController);
route.delete('/delete/:id', controllerCharacters.deleteCharacterController);

module.exports = route;
