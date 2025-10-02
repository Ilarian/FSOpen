const express = require('express')
const cors = require('cors')
const {DB_URI} = require('./utils/config')
const mongoose = require("mongoose")
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')

const app = express()


mongoose.connect(DB_URI)

app.use(express.json())
app.use(cors())
app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app