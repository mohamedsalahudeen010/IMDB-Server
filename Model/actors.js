import mongoose from "mongoose";

const actorsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    Bio:{
        type:String,
        required:true
    },
  
},
{ timestamps: true }
)

const Actor=mongoose.model("actors",actorsSchema)


export default Actor