const user = require("../models/user");

async function create(req, res, next) {
    try{
        let a=await user.findOne({email:req.body.email});
    if(a==null){
        let response = await user.create({
            username: req.body.username,
            email:req.body.email,
            password: req.body.password
        })
        return res.json(response)
    }
    else{
        throw {success: false, message: 'email already exist',status: 400};
    }
    }
    catch(err){
        console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
}; 

async function signIn(req, res, next) {
    try{
        let a=await user.findOne({email:req.body.email});
        if(a==null){
            throw {success: false, message: 'email not found',status: 400};
        }
        else{
            await a.comparePassword(req.body.password, (err, match) => {
                if (err) throw 'err';
                if (match) {
                    res.json({success: true, message: 'passwords match',status:200,userData: a});
                }
                else{
                    res.status(400).json({success: false, message: 'passwords do not match ',status:400 ,userData: a});
                }
            });
        }
    }
    catch(err){
        // console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
};

module.exports= {create,signIn};