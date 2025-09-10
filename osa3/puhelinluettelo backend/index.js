const express = require('express')
const app = express()
const morgan = require("morgan")

app.use(express.json())
morgan.token('body', (req, res) => {
    if(req.body) return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people </p>
        <p>${Date().toString()}</p>
        `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if(person){
        res.send(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/delete/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.send(persons)
})

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body

    if(!name || !number) return res.status(400).send({error: 'Missing name or number'})
    if(persons.some(person => person.name === name)) return res.status(400).send({error: "name must be unique"})

    const id = Math.round(Math.random() * 10_000).toString()
    const newPerson = {
            name: name,
            number: number,
            id: id
        }

    persons = persons.concat(newPerson)
    res.send(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})