const charactersService = require('../characters/character.service')
const mongoose = require('mongoose')

const findAllCharactersController = async (req, res) => {
    const characters = await charactersService.findAllCharactersService();
    if(characters.length == 0){
      return res.status(404).send({message: 'Não existe nenhum cavaleiro cadastrado'});
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
      return res.status(404).send({message: "Cavaleiro não encontrado"});

    }
    res.send(chosenCharacter);
};

const createCharacterController = async (req, res) =>{
  const character = req.body;

  if (
    !character || 
    !character.name || 
    !character.skill || 
    !character.picture
    ) {
    return res.status(400).send({message: "Envie todos os campos do cavaleiro!"});
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
    return res.status(404).send({message: 'Cavaleiro não encontrado!'});
  }
  
  if (
    !characterEdit || 
    !characterEdit.name || 
    !characterEdit.skill || 
    !characterEdit.picture
    ) {
    return res.status(400).send({message: "Envie todos os campos do cavaleiro!"});
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
    res.send({ message: 'Cavaleiro não encontrado!' });
  }

  await charactersService.deleteCharacterService(idParam);

  res.send({ message: 'Cavaleiro deletado com sucesso!' });

};

module.exports = {
    findAllCharactersController,
    findByIdCharacterController,
    createCharacterController,
    updateCharacterController,
    deleteCharacterController
};


