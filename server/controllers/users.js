const user = require("../models/user");
const nodemailer = require("nodemailer");
const { config } = require("dotenv/types");
config=require('...\config\env');
const link=config.link;

async function create(req, res, next) {
    try{
        let a=await user.findOne({email:req.body.email});
    if(a==null){
        let response = await user.create({
            username: req.body.username,
            email:req.body.email,
            password: req.body.password
        })
        sendMail(response.email);
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
        let check=await user.findOne({email:req.body.email});
        console.log(check?.verified);
        if(check==null){
            throw {success: false, message: 'email not found',status: 400};
        }
        else{
            await check.comparePassword(req.body.password, (err, match) => {
                if (err) throw 'err';
                if (match) {
                    if(check.verified==true){
                        res.json({success: true, message: 'passwords match',status:200,userData: check});
                    }
                    else{
                        res.status(400).json({success: false, message: 'please verify your account ',status:400 ,userData: check});
                    }
                }
                else{
                    res.status(400).json({success: false, message: 'passwords do not match ',status:400 ,userData: check});
                }
            });
        }
    }
    catch(err){
        // console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
};

async function verified(req, res, next) {
    try{
        let Email=req.params.email.replace(/:/g,'');
        let check=await user.findOne({email:Email});
        if(check==null){
            res.json({success: false, message: 'email not exist ',status:400 ,userData: check});
        }
        else{
            // console.log(Email);
            let response=await user.findOneAndUpdate({email:Email},{$set:{verified:true}},{returnOriginal:false});
            console.log(`${response}`);
            res.render('send');
        }
    }
    catch(err){
        // console.log(err);
        err.status?res.status(err.status).json(err):res.status(400).json(err);
    }
};

sendMail=(email)=>{
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
          user: 'gossip.1fun@gmail.com',
          pass: 'gossip1234'
        }
    });

    let mailOption={
        from:'gossip.1fun@gmail.com',
        to: email,
        subject: 'Email varification',
        text :`For varification click on this link :-    ${link}:${email}`
    };
    
    transporter.sendMail(mailOption,(err, data)=>{
        if(err){
            console.log(`error occurs ${err}`);
        }
        else{
            console.log(`email sent!!! ${JSON.stringify(data)}`);
        }
    });
}

module.exports= {create,signIn,verified};