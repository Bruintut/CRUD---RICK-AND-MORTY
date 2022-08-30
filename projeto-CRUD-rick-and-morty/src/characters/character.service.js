

  const Character = require('../characters/Character')


  const findAllCharactersService = async () =>{
    const characters = await character.find();

    return characters;
  };

  const findByIdCharacterService = async (id) => {
    const character = await character.findById(id);
    return character;
     
  };

  const createCharacterService = async (newCharacter) =>{
    const newId = await Character.create(newCharacter);
    newCharacter.id = newId;
    return newCharacter;
  };

  const updatenewCharacterService = async (id, characterEdited) => {
    const updatedCharacter = await Character.findByIdAndUpdate(id, characterEdited);
    return updatedCharacter;
  };

  const deleteCharacterService = async (id) => {
    return Character.findByIdAndDelete(id);
  }

  module.exports = {
    findAllCharactersService,
    findByIdCharacterService,
    createCharacterService,
    updatenewCharacterService,
    deleteCharacterService

  };
