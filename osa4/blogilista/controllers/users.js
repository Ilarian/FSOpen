const usersRouter = require("express").Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    try{
        const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
        res.json(users)
    }catch(err){
        console.error("Fetching users from db: ", err)
        res.status(400).send()
    }
    
})

usersRouter.post('/', async (req, res) => {
    const saltRounds = 10
    try{
        const { username, password, name } = req.body
        if(!(username && name && password)) return res.status(400).send({error: "Missing fields"})
        if(username.length < 3 || password.length < 3) return res.status(400).send({error: "Password or Username too short, min length 3"})

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            hashedPassword,
            name
        })

        const savedUser = await user.save()
        return res.status(201).json(savedUser)

    }catch(err){
        if(err.code === 11000){
            console.log("Duplicate user error")
            return res.status(500).send({error: "Duplicate username"})
        }
        console.error("New user error: ", err)
        return res.status(500).send({error: "Unexpected error"})
    }
    
})

module.exports = usersRouter