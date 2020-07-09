const express = require('express')
const app = express()

let persons = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
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

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on poart ${PORT}`)
})