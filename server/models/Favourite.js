import mongoose from "mongoose";

const favVehicleScema = new mongoose.Schema({
    userId:String,
    vehicleId:String,
    isLiked:{
        type:Boolean,
        default:false
    }
})

const favVehicleModel = mongoose.model('favVehicles',favVehicleScema);
export default favVehicleModel;