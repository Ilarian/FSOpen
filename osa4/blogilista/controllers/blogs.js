const blogsRouter = require("express").Router()
const Blog = require('../models/Blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  if(!request.body.title || !request.body.url) return response.status(400).send({error: "missing title or url"})
  const blog = new Blog(request.body)
  const res = await blog.save()
  response.status(201).json(res)
})

blogsRouter.delete('/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).send({error: "No id provided"})
  
  try{
    const response = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).json(response)
  }catch(err){
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

module.exports = blogsRouter