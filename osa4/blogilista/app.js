const express = require('express')
const {DB_URI} = require('./utils/config')
const mongoose = require("mongoose")
const blogsRouter = require('./controllers/blogs')

const app = express()


mongoose.connect(DB_URI)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app