const blogsRouter = require("express").Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const {SECRET} = require('../utils/config')


blogsRouter.get('', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  res.json(blogs)
})

blogsRouter.post('', async (req, res) => {
  try{

    const {title, author, url, likes} = req.body
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    
    if(!(title && author && url && user)) {
      return res.status(400).send({error: "missing fields"})
    }

    
    const blog = new Blog({title, author, user: user.id, url, likes})
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    return res.status(201).json(result)
  }catch(err){
    console.log(err)
    return res.status(500).send()
  }
  
})

blogsRouter.delete('/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).send({error: "No id provided"})
  if(!req.user) return res.status(400).send({error: "invalid token"})
  const blogId = req.params.id
  const user = req.user
  
  
  try{
    const blog = await Blog.findById(blogId)
    if(blog.user.toString() === user.id.toString()){
      const response = await Blog.findByIdAndDelete(blogId)
      return res.status(204).json(response)
    }

    return res.status(400).send()
    
  }catch(err){
    console.log(err)
    res.status(400).send({error: "Incorrect id"})
  }

})

blogsRouter.put('/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).send({error: "No id provided"})
  if(!req.body) return res.status(400).send({error: "No body found"})

  try{
    const response = await Blog.findById(req.params.id)

    response.likes = req.body.likes || response.likes
    response.title = req.body.title || response.title
    response.author = req.body.author || response.author
    response.url = req.body.url || response.url

    const update = await response.save()
    return res.status(200).json(update)
  }catch(err){
    return res.status(400).send({error: "Incorrect id"})
  }
  
})

blogsRouter.delete('/a/d', async (req, res) => {
  try{
    await Blog.deleteMany({})
    res.send({msg: "all deleted"})
  }catch(err){
    res.status(500).send({msg: "Couldn't delete"})
  }
})

module.exports = blogsRouter