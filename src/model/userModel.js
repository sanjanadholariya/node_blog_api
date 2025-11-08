const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['Admin','User']
    },
    profile : String

},{
    timestamps : true,
    versionKey : false
})

module.exports = mongoose.model('user',userSchema);