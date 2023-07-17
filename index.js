const express = require('express')
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler')
const app = express()

const bodyParser = require('body-parser')

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

app.use(bodyParser.json())

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Blog API is running')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

/* Error handling */

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
  })
}

start()