// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')
const server = express()



server.post('/api/users', (req,res) => {

  user.insert(user)  
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
    








server.use('*', (req, res) => {
res.status(404).json({
    message: ' not found'
})

})
module.exports = server; // EXPORT YOUR SERVER instead of {}
