const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument, such as: node mongo.js Password123')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNum = process.argv[4]

const url = `mongodb+srv://pilikiwi:${password}@cluster0.byrxb.mongodb.net/person?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    phoneNum: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    phoneNum: phoneNum
})


//check and see if there are inputs for name or phoneNum
process.argv[3] === undefined || process.argv[4] === undefined
?Person.find({}).then(result=>{
    result.forEach(person =>{
        console.log(person)
    })
    mongoose.connection.close()
})
:person.save().then(result=>{
    console.log('person saved')
    mongoose.connection.close()
})