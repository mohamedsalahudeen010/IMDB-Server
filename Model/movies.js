import mongoose from "mongoose";

const movieScheme= mongoose.Schema({
    movieName:{
        type:String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    industry:{
        type:String,
        required:true,
    },
    leadActorName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    leadActorImage:{
        type:String,
        required:true,
      
    },
    actorName:{
        type:String,
        maxlength:32,
        trim:true
    },
    actorImage:{
        type:String,
    },
    director:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    directorImage:{
        type:String,
        required:true,
    },
    musicDirector:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    musicDirectorImage:{
        type:String,
        required:true,
    },
    producer:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    producerImage:{
        type:String,
        required:true,
    },
    poster:{
        type:String,
        required:true,
        trim:true 
    },
    summary:{
        type:String,
        required:true,
    },
    trailer:{
        type:String,
        required:true,
        trim:true 
    },
    
    
 

})
const Movies=mongoose.model("movies",movieScheme)

export default Movies
