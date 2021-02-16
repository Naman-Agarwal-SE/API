const express=require('express');
const usersControl = require('../controllers/users');


const router = express.Router();
router.post('/signup',usersControl.create);
router.post('/signin',usersControl.signIn);
router.get('/verified:email',usersControl.verified)

module.exports=router;