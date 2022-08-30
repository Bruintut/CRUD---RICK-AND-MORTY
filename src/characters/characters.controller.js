const charactersService = require('../characters/character.service')
const mongoose = require('mongoose')

const findAllCharactersController = async (req, res) => {
    const characters = await charactersService.findAllCharactersService();
    if(characters.length == 0){
      return res.status(404).send({message: 'Não existe nenhum personagem cadastrado'});
    }
    res.send(characters)
};

const findByIdCharacterController = async (req, res) =>{
    const idParam = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(idParam)){
      res.status(400).send({message: "Id inválido"});
      return; 

    }
    const chosenCharacter = await charactersService.findByIdCharacterService(idParam);

    if (!chosenCharacter){
      return res.status(404).send({message: "Personagem não encontrado"});

    }
    res.send(chosenCharacter);
};

const searchCharacterController = async (req, res) =>{
  const {user, name, imageUrl} = req.body;
  const findByName = await charactersService.findByNameCharacterService(name);

  if (findByName) {
    res.status(400).send({ message: "Nome já registrado" });
  } else {
    const created = await charactersService.createCharactersService({user, name, imageUrl,});
  };
};

const createCharacterController = async (req, res) =>{
  const character = req.body;

  if (
    !character || 
    !character.user || 
    !character.name || 
    !character.imageUrl
    ) {
    return res.status(400).send({message: "Envie todos os campos do personagem!"});
  }
  const newCharacter = await charactersService.createCharacterService(character);
  res.send(newCharacter);

};

const updateCharacterController = async (req, res) => {
  const idParam = req.params.id;
  const characterEdit = req.body;
  if (!mongoose.Types.ObjectId.isValid(idParam)){
    res.status(400).send({message: "Id inválido"});
    return;
  }

  const chosenCharacter = await charactersService.findByIdCharacterService(idParam);
  
  if(!chosenCharacter){
    return res.status(404).send({message: 'Personagem não encontrado!'});
  }
  
  if (
    !characterEdit || 
    !characterEdit.user || 
    !characterEdit.name || 
    !characterEdit.imageUrl
    ) {
    return res.status(400).send({message: "Envie todos os campos do personagem!"});
  }


  const updatedCharacter = await charactersService.updateCharacterService(idParam, characterEdit);
  res.send(updatedCharacter);

};

const deleteCharacterController = async (req, res) =>{
  const idParam = Number(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(idParam)){
    res.status(400).send({message: "Id inválido"});
    return; 

  }

  const chosenCharacter = await charactersService.findByIdCharacterService(idParam);


  if(!chosenCharacter) {
    res.send({ message: 'Personagem não encontrado!' });
  }

  await charactersService.deleteCharacterService(idParam);

  res.send({ message: 'Personagem deletado com sucesso!' });

};

module.exports = {
    findAllCharactersController,
    findByIdCharacterController,
    searchCharacterController,
    createCharacterController,
    updateCharacterController,
    deleteCharacterController
};


