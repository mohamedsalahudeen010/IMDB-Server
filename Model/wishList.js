import mongoose from "mongoose";

const wishListSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    
    movies:{
        type:[],
        
    },
    
    
},

)

const WishList=mongoose.model("wishlist",wishListSchema)


export default WishList