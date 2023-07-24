const { User, Session } = require('../models')

const userValidator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.disabled) {
      /* Lets kill the sessions just to be safe */
      await Session.destroy({
        where: {
          userId: req.decodedToken.id
        }
      })
      throw new Error('User is disabled')
    }
  } catch (error) {
    return res.status(401).json({error: error.message})
  }
  next();
}

module.exports = userValidator

