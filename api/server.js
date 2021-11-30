// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')

const server = express()
server.use(express.json()) 

server.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await users.remove(id);
        if (!deletedUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
        else {
            // const deletedUser = await users.remove(deletedUser.id)
            res.status(200).json(deletedUser)
        }
    }
    catch (err) {
        res.status(500).json({ message:"The user could not be removed",
         err:err.message })
    }
})


server.post("/api/users", (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(400).json("Please provide name and bio for the user")
    }
    else {
        users.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database",
                 err:err.message

             })
            })
    }

})

server.get('/api/users', (req, res) => {
//  console.log('gettjing all users')  
users.find() 
.then(users => {
    res.json(users)
})
.catch(err =>{
res.status(500).json({
    message: 'error getting users',
    err:err.message,
})

}) 
})
server.get('/api/users/:id', (req, res) => {
    //  console.log('gettjing all users')  
    users.findById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist", 
            })           
        }
        
        res.json(user)
    })
    .catch(err =>{
    res.status(500).json({
        message: 'error getting user',
        err:err.message,
    })
    
    }) 
    })


    server.put("/api/users/:id", async (req, res) => {
        const changes = req.body
        const { id } = req.params
        try {
            if (!changes.name || !changes.bio) {
                res.status(400).json('Please provide new name and bio')
            }
            else {
                const updatedUser = await users.update(id, changes)
                if (!updatedUser) {
                    res.status(500).json("User doesn't exist")
                } else {
                    res.status(200).json(updatedUser)
                }
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    
    })








server.use('*', (req, res) => {
res.status(404).json({
    message: ' not found'
})

})
module.exports = server; // EXPORT YOUR SERVER instead of {}
