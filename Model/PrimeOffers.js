import mongoose from "mongoose";

const primeOfferScheme= mongoose.Schema({
   
    images:{
        type:String,
        required:true,
        trim:true
    },

})

const PrimeOffer=mongoose.model("gallery",primeOfferScheme)

export default PrimeOffer