import mongoose from "mongoose";


const authSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        
    },
    passwordHash:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","seller"]
    },
    refreshToken:{
        type:String
    }

})

const authModel = mongoose.model("auth", authSchema);

export default authModel