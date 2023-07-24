const { Session } = require('../models')

const sessionValidator = async (req, res, next) => {
  try {
    const session = await Session.findOne({ 
      where: {
        userId: req.decodedToken.id
      }
    })
    if (!session) {
      return res.status(401).json({error: 'No session exists for this user'})
    }
    next()
  } catch {
    return res.status(401).json({error: 'invalid session'})
  }
  
}

module.exports = sessionValidator