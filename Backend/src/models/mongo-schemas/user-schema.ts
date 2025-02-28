import mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,unique:true},
})
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;