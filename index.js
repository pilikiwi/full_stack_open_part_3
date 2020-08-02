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
    res.json(`Phonebook has info for ${persons.length} people ${Date()}`)
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

  if (!body.name || !body.number){
    return res.status(400).json("The name or number is missing")
  } else if (persons.find(person => person.name == body.name) ){
    return res.status(400).json("error: 'name must be unique'")
  }

  const person = {
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})