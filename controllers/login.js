const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../utils/config')
const User = require('../models/user')

router.post('/', async (req, res) => {
  const body = req.body
  console.log(req.body)

  try {
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })

    const passwordTest = await bcrypt.compare(body.password, user.password)

    /* return error if auth fails */
    if(!(user && passwordTest)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken =  {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

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