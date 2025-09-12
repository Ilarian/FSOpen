const express = require('express')
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()
const Person = require('./modules/person')

app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => {
    if(req.body) return JSON.stringify(req.body)
})
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
    Person.find({}).then(data => {
      res.send(
        `<h1>The phonebook contains ${data.length} persons</h1>`
      )
    })
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  .catch(err => next(err))
  
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
  .catch(err => next(err))
})

app.delete('/api/persons/delete/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const {name, number} = req.body

    if(!name || !number) return res.status(400).send({error: 'Missing name or number'})

    const newPerson = new Person({
            name: name,
            number: number,
        })

    newPerson.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = req.body
  Person.findByIdAndUpdate(id, person, {new: true}).then(result =>{
      res.send(result)
    }
  )
  .catch(err => next(err))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.name)

  if (error.name === 'ValidationError'){
    return res.status(400).send({error: 'Invalid input'})
  }

  if (error.name === "CastError") {
    return res.status(400).send({error: 'malformatted id'})
  }

  return res.status(500).send({error: "internal error"})
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})