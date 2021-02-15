const express=require('express');
const router = express.Router();
const users = require('./users');
const posts = require('./posts');

router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);
 router.use('/users',users);
 router.use('/posts',posts);
module.exports=router;