require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send("hiteshdotcom")
})

app.get('/login', (req, res) => {
    res.send(`<h1>please login at chat app</h1>`)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
