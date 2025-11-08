const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.registerUser = async(req , res) => {
    try {
        console.log("register User")

        const existUser = await userModel.findOne({email : req.body.email})
        if(existUser){
            return res.status(409).json({message : "User Already Exist"})
        }
        console.log(req.file)
        req.body.password = await bcrypt.hash(req.body.password , 10)
        req.body.profile = req.file.filename;

        console.log(req.body)

        await userModel.create(req.body)
        return res.status(200).json({message : "User Register Successfully."})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.loginUser = async(req , res) => {
    try {
        const existUser = await userModel.findOne({email : req.body.email})
        if(!existUser){
            return res.status(404).json({message :"User Not Found ! Register First."})
        }

        const checkPass = await bcrypt.compare(req.body.password , existUser.password)
        if(checkPass){
            const token = await jwt.sign({userId : existUser._id},process.env.SECRET_KEY)
            // console.log(token)
            // console.log(req.body)
            return res.status(200).json({message : "User Login Successfully",data : token})
        }
        return res.status(402).json({message : "Invalid credential"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

