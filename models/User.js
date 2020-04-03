const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

User = mongoose.model('user', UserSchema);
module.exports = User;