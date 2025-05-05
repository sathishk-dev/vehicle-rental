import mongoose from 'mongoose'


const AdminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const AdminModel = mongoose.model('admin',AdminSchema);
export default AdminModel;