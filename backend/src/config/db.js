import config from "./config.js";
import mongoose from "mongoose";



const connectToDb = async ()=>{
     
    try {
        
        await mongoose.connect(config.MONGODB_URL)
        console.log("database connected successfully..")
    } catch (error) {
         
        console.log("database connection failed..")
    }
    

}


export default connectToDb




