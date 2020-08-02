require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) =>{
    Person.find({}).then(persons=>{
      res.json(persons.map(person=>person.toJSON()))
    })
})

app.get('/info', (req, res) =>{
  Person.find({}).then(persons=>{
    res.json(`Phonebook has info for ${persons.length} people on ${Date()}`)
    })
})

app.get('/api/persons/:id', (req, res) =>{
  Person.findById(req.params.id).then(person=>{
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  !body.name || !body.number
  ?res.status(400).json("The name or number is missing")
  :person.save().then(savedPerson=>{
    res.json(savedPerson.toJSON())
  })
  .catch(error => console.log(error.message))
})

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})