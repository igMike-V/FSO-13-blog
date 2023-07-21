const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')
const {Readinglist, User} = require('../models')

router.post('/', tokenExtractor, async (req, res) => {
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

module.exports = router