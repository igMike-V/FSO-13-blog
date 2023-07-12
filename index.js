require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {};
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});

Blog.sync()

/* Endpoints */
app.get('/', (_req, res) => {
  res.send('Blog API is running');
});

app.get('/api/blogs', async (_req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs)
});

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req)
    const note = await Blog.create(req.body)
    return res.json(note)
  } catch (error) {
    return res.status(400).json({error})
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})