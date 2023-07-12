require('dotenv').config()
const express = require('express');
const app = express();


/* Endpoints */
app.get('/', (_req, res) => {
  res.send('Blog API is running');
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})