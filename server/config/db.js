import mongoose from "mongoose";

async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGODB);
        console.log("DB Connected Successfully...")
    }
    catch(error){
        console.log("DB Connection Error:", error);
    }
}

export default dbConnect;