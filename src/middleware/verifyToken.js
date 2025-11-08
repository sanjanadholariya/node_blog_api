const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const verifyToken = async(req ,res , next) => {
    try {
    const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).json({message : "Unauthorized User"})
        }
        const token = authorization.split(" ")[1];
        // console.log(token);
        const {userId} = await jwt.verify(token,process.env.SECRET_KEY)
        const user = await userModel.findById(userId)
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyToken;