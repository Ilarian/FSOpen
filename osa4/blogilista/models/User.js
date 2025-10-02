const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blogs'
  }],
  name: String,
})


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.hashedPassword
    delete returnedObject.__v
  }
})

const User = mongoose.model('Users', userSchema)

module.exports = User