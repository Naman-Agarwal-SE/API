const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const userSchema = mongoose.Schema({
    username:{
        type : String,
        required : true,
        trim: true
    },
    email:{
        type : String,
        required : true,
        trim: true
    },
    verified:{
      type: Boolean,
      default:false
    },
    password: { 
        type: String, 
        required: true, 
        trim: true 
    }
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);  
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
      if (err) done(err);
      else done(err, isMatch);
    });
  };

module.exports =mongoose.model('User',userSchema);