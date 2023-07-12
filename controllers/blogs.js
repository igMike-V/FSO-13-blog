const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (_req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    console.log(req)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({error})
  }
})

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  const blog = await Blog.findByPk(req.params.id)
  if(blog) {
      try {
        await blog.destroy()
        res.status(204).end()
      } catch (error) {
        res.status(400).json({error})
      }
  } else {
    res.status(404).end()
  }
})

module.exports = router