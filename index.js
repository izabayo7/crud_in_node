const express = require('express') // import express
const app = express() // create an express app
var bodyParser = require('body-parser')
const {validateUser} = require("./utils/validations"); // import bodyparser

const users = [{
    id: 1,
    name: "Tresor",
    age: 20,
    gender: "Male"
}]

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// api to get all users
app.get('/api/users', (req, res) =>{
    res.send(users)
})

// api to get user by id
app.get('/api/users/:id',(req,res)=>{
    for (const i in users) {
        if(users[i].id == req.params.id)
            return res.send(users[i])
    }
    return res.status(404).send(`User with id(${req.params.id}) was not found`)
})

// api to create a user
app.post('/api/users',(req,res)=>{

    // Joi
    let error = validateUser(req.body)
    if( error != '')
        return res.status(400).send(error)

    let user = {
        id: users == [] ? 1 : users[users.length - 1].id + 1,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    }
    users.push(user)
    return res.status(201).send(user)
})

// api to update a user
app.put('/api/users/:id',(req,res)=>{

    // Joi
    let error = validateUser(req.body)
    if( error != '')
        return res.status(400).send(error)

    for (const i in users) {
        if(users[i].id == req.params.id) {
            users[i].name = req.body.name
            users[i].age = req.body.age
            users[i].gender = req.body.gender
            return res.send(users[i])
        }
    }

    return res.status(404).send(`User with id(${req.params.id}) was not found`)
})

// api to delete user by id
app.delete('/api/users/:id',(req,res)=>{
    for (const i in users) {
        if(users[i].id == req.params.id) {
            users.splice(i,1)
            return res.send(`User with id(${req.params.id}) was deleted`)
        }
    }

    return res.status(404).send(`User with id(${req.params.id}) was not found`)
})

app.listen(3000,()=>{
    console.log("Server is running ...")
})