const express = require('express')
const app = express()

const users = [{
    id: 1,
    name: "Tresor",
    age: 20,
    gender: "Male"
}]

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


app.listen(3000,()=>{
    console.log("Server is running ...")
})