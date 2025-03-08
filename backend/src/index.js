const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGOURI)
  .then(() => console.log("Conected to MongoDB"))
  .catch(() => console.log("Can not conect to MongoDB"))

app.listen(5000, () => {
  console.log("Server runs in port 5000")
})