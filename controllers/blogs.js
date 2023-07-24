const router = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')
const sessionValidator = require('../middleware/sessionValidator')
const userValidator = require('../middleware/userValidator')
const { Op } = require('sequelize')

const { Blog, User } = require('../models')


const blogFinder = async ( req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(!req.blog) {
    return res.status(404).end()
  }
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search){
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: {exclude: ['userId']},
    include: {
      model: User,
      attributes: ['name'] 
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, userValidator, sessionValidator, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({error})
  }
  
})

router.delete('/:id', blogFinder, tokenExtractor, userValidator, sessionValidator, async (req, res) => {
  if(req.blog && req.decodedToken) {
    /* Check if user matches */
    if(req.decodedToken.id === req.blog.userId){
      await req.blog.destroy()
      res.status(204).end()
    } else {
      res.status(401).status.json({error: 'user did not create blog'})
    }
        
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, tokenExtractor, userValidator, sessionValidator, async (req, res) => {
  if (req.body.likes) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router