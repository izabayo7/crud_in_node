const express = require('express') // import express
const app = express() // create an express app
var bodyParser = require('body-parser')
const {validateUser} = require("./utils/validations"); // import bodyparser\
const {User} = require("./model/user.model")
const mongoose = require('mongoose'); // import mongoose

mongoose.connect("mongodb://localhost:27017/db_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFIndAndModify: false
}).then(() => console.log("Connected to mongodb successfully")).catch(err => console.log(err));


const users = [{
    id: 1,
    name: "Tresor",
    age: 20,
    gender: "Male"
}]

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// api to get all users
app.get('/api/users', async (req, res) => {
    const Users = await User.find();
    res.send(Users)
})

// api to get user by id
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findOne({id: req.params.id});
    if (!user)
        return res.status(404).send(`User with id(${req.params.id}) was not found`)
    return res.send(user)
})

// api to create a user
app.post('/api/users', async (req, res) => {

    // Joi
    let error = validateUser(req.body)
    if (error != '')
        return res.status(400).send(error)

    let user = new User({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    })
    await user.save()
    return res.status(201).send(user)
})

// api to update a user
app.put('/api/users/:id', async (req, res) => {

    // Joi
    let error = validateUser(req.body)
    if (error != '')
        return res.status(400).send(error)

    let user = await User.findOne({id: req.params.id});
    if (!user)
        return res.status(404).send(`User with id(${req.params.id}) was not found`)
    user = await User.findOneAndUpdate({id: req.params.id},req.body, {new: true});
    return res.send(user)
})

// api to delete user by id
app.delete('/api/users/:id', async(req, res) => {
// 2 ways
    let user = await User.findOne({id: req.params.id});
    if (!user)
        return res.status(404).send(`User with id(${req.params.id}) was not found`)

    user = await User.findByIdAndDelete(req.params.id)
    return res.send("user deleted")
})

app.listen(3000, () => {
    console.log("Server is running ...")
})