const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title : String,
    image : String,
    description : String,
    author_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true,
    versionKey : false
})

module.exports = mongoose.model('article',articleSchema);