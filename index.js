const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let persons = [
          {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1
          },
          {
            name: "Ada Lovelace",
            number: "39-44-5323523",
            id: 2
          },
          {
            name: "Dan Abramov",
            number: "12-43-234345",
            id: 3
          },
          {
            name: "Mary Poppendieck",
            number: "39-23-6423122",
            id: 4
          }
]

app.get('/', (req, res) => {
    res.send('<h1>Full Stack Open Part 3 - Phonebook </h1>')
})

app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/info', (req, res) =>{
  const total = Number(persons.map(person => person.id).length)

  res.send(`<p> Phonebook has info for ${total} people <br></br>
           ${Date()} </p>`)
})

app.get('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person
  ?res.json(person)
  :res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const randomId = Math.floor(Math.random()*Math.floor(100000))
  
  return randomId
}

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
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})