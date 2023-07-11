require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

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
    }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});

/* Endpoints */
app.get('/', (req, res) => {
  res.send('Blog API is running');
});

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})