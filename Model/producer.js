import mongoose from "mongoose";

const producerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productionName:{
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
    }
   
    
    
},
{ timestamps: true }
)

const Producer=mongoose.model("producer",producerSchema)


export default Producer