/*  imports
 *
 */
const express = require('express')

const moveModel = require('../models/move.js')

const moveRouter = express.Router()

/*
 * 
 * TODO: Put all request handlers here
 */

 // GET ALL ROUTE
moveRouter.get('/character/:characterId/moves', async (req, res) => {
  try {
      const allMoves = await moveModel.getAllMoves()
      res.json(allMoves)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})
 
// GET ONE
moveRouter.get('/character/:characterId/moves/:moveId', async (req, res) => {
  try {
      const move = await moveModel.getMoveById(req.params.moveId)
      res.json(move)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// GET BY CHARACTER ID
moveRouter.get(`/character/:characterId/moves/:moveId`, async (req, res) =>{
  try{
    const movesByChar = await moveModel.getMovesByCharacterID(req.params.characterId)
    res.json(movesByChar) 
  } catch (error){
    res.statusCode(500).json(error)
      console.log(error)
  }
})

// CREATE
moveRouter.post('/character/:characterId/moves', async (req, res) => {
  try {
    console.log('trying to post')
      await moveModel.create(req.params.characterId, req.body)
      res.json(req.body)
  } catch (error) {
      // res.statusCode(500).json(error)
      console.log(error)
  }
})

// UPDATE
moveRouter.put('/character/:characterId/moves/:moveId', async (req, res) => {
  try {
      await moveModel.update(req.params.moveId, req.body)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})


// DELETE
moveRouter.delete('/character/:characterId/moves/:moveId', async (req, res) => {
  try {
      await moveModel.deleteMove(req.params.characterId, req.params.moveId)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

/* 
 *
 * Export the router from the file.
 *
 */
module.exports = moveRouter
