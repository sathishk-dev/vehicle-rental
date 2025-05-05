import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    vehicleName: String,
    category:String,
    details:String,
    type:String,
    mode:String,
    actualPrice:Number,
    offerPrice:Number,
    imageUrl:String,
    fuelCapacity:Number,
    capacity:Number,
    isLiked:{
        type:Boolean,
        default:false,
    },
})

const vehicleModel = mongoose.model("vehicles",vehicleSchema);

export default vehicleModel;