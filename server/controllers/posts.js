const post = require("../models/post");
const count =require('../models/count');
const user = require("../models/user");

 const create = async(req, res, next)=> {
    try{
        // console.log(req.body);
        let userTotal = await count.findOneAndUpdate({},{$inc:{userCount:1}},{returnOriginal:false});
        // console.log(userTotal);
        let response = await post.create({
            _id: userTotal.userCount,
            userId:req.body.userId,
            url:req.body.url,
            description:req.body.description,
            city:req.body.city,
            state:req.body.state
        })
        return res.json(response)
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 

const deletePost = async(req, res, next)=> {
    try{
        // console.log(req.body._id);
        let response = await post.deleteOne({_id:req.body._id });
        return res.json(response)
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 

const updatePost = async(req, res, next)=> {
    try{
        // console.log(req.body);
        if(req.body.url==""){
            let response = await post.findOneAndUpdate({_id:req.body._id},{$set:{url:null,description:req.body.description}},{returnOriginal:false});
            return res.json(response)
        }
        else{
            let response = await post.findOneAndUpdate({_id:req.body._id},{$set:{url:req.body.url,description:req.body.description}},{returnOriginal:false});
            return res.json(response)
        }
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 
const getAllPosts = async(req, res, next)=> {
    try{
        // console.log('hello');
        let response = await post.aggregate([
            {$lookup:{
            from:"users",
            localField:"userId",
            foreignField:"_id",
            as:"userDoc"
            }},{
                   $project: 
                   {
                        _id: 1,
                        totalLikes : 1,
                        likedBy : 1,
                        userId: 1,
                        url:1,
                        description : 1,
                        city:1,
                        state:1,
                        "userDoc" :
                        {
                            "username" : 1
                        }      
                    }
                },
                {
                    $sort: 
                    {
                        "_id": -1
                    }
                }
            ]);
        // console.log(response);
        return res.json(response)
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 
const likePost = async(req, res, next)=> {
   try{
        //  console.log(req.body);
        let liked=await post.findOne({_id:req.body._id,likedBy:req.body.likedBy});
        // console.log(liked);
        if(liked==null){
            let response = await post.findOneAndUpdate({_id:req.body._id},{$push:{likedBy:req.body.likedBy},$inc:{totalLikes:1}},{returnOriginal:false});
        return res.json(response);
        }else{
            let response = await post.findOneAndUpdate({_id:req.body._id},{$pull:{likedBy:req.body.likedBy},$inc:{totalLikes:-1}},{returnOriginal:false});
        return res.json(response);
        }
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 
const likedBy=async(req, res, next)=> {
    try{
        let response = await user.find({_id:{$in:req.body.likedBy}}); 
        // console.log(response);
        return res.json(response)
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 

module.exports= {create,deletePost,updatePost,getAllPosts,likePost,likedBy};