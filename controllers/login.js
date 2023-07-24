const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../utils/config')
const {User, Session} = require('../models')


router.post('/', async (req, res) => {
  const body = req.body

  try {
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })

    const passwordTest = await bcrypt.compare(body.password, user.password)

    /* return error if auth fails */
    if(!(user && passwordTest && !user.disabled)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken =  {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    try {
      await Session.create({ userId: user.id })
      if(!Session) {
        return res.status(401).json({error: 'could not create session'})
      }
    } catch (error) {
      return res.status(401).json({error: 'could not create session'})
    } 

    res.status(200).send({
      token, username: user.username, name: user.name
    })
  } catch (error){
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

})

module.exports = router