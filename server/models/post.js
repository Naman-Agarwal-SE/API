const mongoose = require("mongoose");



const postSchema = mongoose.Schema({
    _id:{
        type : Number,
        required : true,
        trim: true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        trim: true
    },
    url:{
        type : String,
        trim: true
    },
    description:{
        type : String,
        required : true,
        trim: true
    },
    totalLikes:{
        type : Number,
        required : true,
        default: 0
    },
    likedBy:[{
        type : mongoose.Schema.Types.ObjectId,
        trim: true,
    }],
    city:{
        type:String,
        trim:true
    },
    state:{
        type:String,
        trim:true
    }
});



module.exports =mongoose.model('Post',postSchema);