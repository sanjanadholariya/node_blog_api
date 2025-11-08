const articleModel = require('../model/articleModel')
const fs = require('fs')
const path = require('path')
module.exports.addArticle = async(req , res) => {
    try {
        if(req.file){
            req.body.image = req.file.filename
        }
        req.body.author_id = req.user._id
        // console.log(req.body)
        await articleModel.create(req.body)
        return res.status(200).json({message : "Article add successfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.allArticle = async(req , res) => {
    try {
        const allArticle = await articleModel.find({isDelete : false}).populate('author_id','-password')
        console.log(allArticle)

        return res.status(200).json({message : "All article fetched successfully " , data : allArticle})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.deleteArticle = async(req , res) => {
    try {
        console.log(req.params.id)   // article id which admin want to delete

        const article = await articleModel.findById(req.params.id)
        if(!article){
            return res.status(404).json({message : "Data Not Found"})
        }
        if(req.user._id.toString() === article.author_id.toString() ){
            await articleModel.findByIdAndUpdate(req.params.id ,{isDelete : true})
            return res.status(200).json({message : "Article Delete Success"})
        }else{
            return res.status(403).json({message : "User has no access to delete other's article"})
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.editArticle = async(req , res) => {
    try {
    const article = await articleModel.findOne({ _id: req.params.id, isDelete: false });


        
        if(!article){
            return res.status(404).json({message : "Data Not Found !"})
        }
        if(req.user._id.toString() === article.author_id.toString() ){
        if(req.file){
            if(article.image){
                const oldPath = path.join(__dirname,'../uploads',article.image)
                // console.log(oldPath)

                fs.unlinkSync(oldPath)
            }
            req.body.image = req.file.filename
        }
        await articleModel.findByIdAndUpdate(req.params.id,req.body)
        const editedArticle = await articleModel.findById(req.params.id)
        return res.status(200).json({message : "Article Edit Success",data : editedArticle})
        }else{
            return res.status(403).json({message : "User has no access to delete other's article"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})

    }
}