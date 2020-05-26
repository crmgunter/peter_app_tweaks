
/* Step 1
 *
 * Import mongoose connection
 *
 */
const mongoose = require('./connection.js')
/* Step 2
 *
 * TODO: create model schema 
 *
 */

const CharacterSchema = new mongoose.Schema({
    name: String,
    portrait: String,    
    tierLetter: String,
    description: String,
    moves: Array
})

const CharacterModel = mongoose.model('character', CharacterSchema)

function getAllCharacters() {
    return CharacterModel.find({})
}

function getCharacterById(characterId) {
    return CharacterModel.findById(characterId)
}

function create(characterData) {
    return CharacterModel.create(characterData)
}

function update(characterId, characterData) {
    return CharacterModel.findByIdAndUpdate(characterId, characterData)
}

function deleteCharacter(characterId) {
    return CharacterModel.findByIdAndDelete(characterId)
}

//exports

module.exports = {
    getAllCharacters,
    getCharacterById,
    create,
    update,
    deleteCharacter
}