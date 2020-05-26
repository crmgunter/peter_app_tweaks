
/* Step 1
 *
 * Import mongoose connection
 *
 */
const mongoose = require('./connection.js')
const CharacterModel = require('./character.js')
/* Step 2
 *
 * TODO: create model schema 
 *
 */

const MoveSchema = new mongoose.Schema({
    name:String,
    characterId:String,
    gif:String,
    notes:String,
    type:String,
    totalFrames:String,
    activeHit:String,
    startUpFrames:String,
    endFrames:String,
    iasa:String,
    autoCancel:String,
    landLag:String,
    lCanceled:String
})

const MoveModel = mongoose.model('move', MoveSchema)

function getAllMoves() {
    return MoveModel.find({})
}

function getMoveById(moveId) {
    return MoveModel.findById(moveId)
}

function getMovesByCharacterID(characterId){
    return MoveModel.find({"characterId": characterId})
}

function create(characterId, moveData) {
    CharacterModel.getCharacterById(characterId).then((character) => {
        MoveModel.create(moveData).then((move) => {
            character.moves.push(move)
            character.save()
        })
    })
}

function update(moveId, moveData) {
    return MoveModel.findByIdAndUpdate(moveId, moveData)
}

function deleteMove(characterId, moveId) {
    CharacterModel.getCharacterById(characterId).then((character) => {
        const removedMoves = character.moves.filter((move) => move._id != moveId)
        character.moves = removedMoves;

        character.save().then(() => {
            return MoveModel.findByIdAndDelete(moveId)
        })
    })
}

//exports

module.exports = {
    getAllMoves,
    getMoveById,
    getMovesByCharacterID,
    create,
    update,
    deleteMove,
    MoveModel
}