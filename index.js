const express = require('express')
require('express-async-errors');
const app = express()

const bodyParser = require('body-parser')

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')

app.use(bodyParser.json())

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Blog API is running')
})

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
  })
}

start()