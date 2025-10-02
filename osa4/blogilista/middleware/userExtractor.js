const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const User = require('../models/User')

const userExtractor = async (req, res, next) => {
    if(req.token){
        const decodedToken = jwt.verify(req.token, SECRET)
        const user = await User.findById(decodedToken.id)
        req.user = user
        next()
    }else{
        next()
    }
}

module.exports = userExtractor