const router = require('express').Router()

const sessionValidator = require('../middleware/sessionValidator')
const tokenExtractor = require('../middleware/tokenExtractor')

const {Readinglist, User} = require('../models')

router.post('/', tokenExtractor, sessionValidator, async (req, res) => {
  try {
    const loggedInUser = await User.findByPk(req.decodedToken.id)
    if(!loggedInUser){
      throw new Error('must be logged in to manipulate reading lists.')
    }
    const readingList = await Readinglist.create({...req.body})
    return res.json(readingList)
  } catch(error) {
    return res.status(400).json({error})
  }
})

router.put('/:id', tokenExtractor, sessionValidator, async (req, res) => {
  try {
    const loggedInUser = await User.findByPk(req.decodedToken.id)
    if(!loggedInUser){
      throw new Error('must be logged in to manipulate reading lists.')
    }
    const readingList = await Readinglist.findByPk(req.params.id)
    if(!readingList){
      throw new Error('reading list not found.')
    }
    console.log(readingList)
    if(readingList.userId !== loggedInUser.id){
      throw new Error('reading list does not belong to logged in user.')
    }
    const updatedReadingList = await readingList.update({...req.body})
    return res.json(updatedReadingList)
  } catch(error) {
    return res.status(400).json({error: error.message})
  }
})

module.exports = router