const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    article : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "article"
      } ,
    comments: [
    {
      user: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "user"
         },
      message: String,
      createdAt: {
         type: Date, 
         default: Date.now 
        },
        isDelete:{
            type : Boolean,
            default : false
        }
    }
  ]
})

module.exports = mongoose.model('comment',commentSchema)
