const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  console.log('requestbody: ', req.body)
  const { password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await User.create({...req.body, password: passwordHash})
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'id']},
    include: [
      {
        model: Blog,
        through: {attributes: []},
        attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
      },
    ],
  })
  if (user) {
    res.json(user)
  } else {
    return res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  /* this route needs auth to use. */
  const user = await User.findByPk(req.params.id)
  if (user) {
    await user.destroy()
    res.status(201)
  } else {
    console.log('user does not exist')
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where:{username: req.params.username}})
  const {username} = req.body
  if( !username ) {
    console.log('malformed request')
    res.status(400).end()
  }
  if (user) {
    user.username = username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router