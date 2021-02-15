const express=require('express');
const postsControl = require('../controllers/posts');

const router = express.Router();
router.post('/create-post',postsControl.create);
router.post('/delete-post',postsControl.deletePost);
router.post('/update-post',postsControl.updatePost);
router.get('/get-post',postsControl.getAllPosts);
router.post('/like-post',postsControl.likePost);
router.post('/likedby-post',postsControl.likedBy);
module.exports=router;