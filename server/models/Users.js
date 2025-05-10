import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    signupFirstName:String,
    signupLastName:String,
    signupEmail:String,
    signupPassword:String,
    address:{
        type: String,
        default:" "
    },
    verified:{
        type:Boolean,
        default:false
    },
    token:String,
})

const userModel = mongoose.model('users',userSchema);

export default userModel;