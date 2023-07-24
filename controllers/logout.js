const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const deletedSessionCount = await Session.destroy({
      where: {userId: req.decodedToken.id}
    })
    console.log(deletedSessionCount)
    if(deletedSessionCount > 0){
      return res.status(204).json({ message: `Deleted all sessions for user: ${req.decodedToken.username}`}).end()
    } else {
      return res.status(404).json({error: 'No session exists for this user'})
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({error: 'an error occured while deleting sessions'})
  }
})

module.exports = router