import express from "express"
import Movies from "../../Model/movies.js";
const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const movies = await Movies.find({}).sort({year:1});
      if (!movies) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.post("/", async (req, res) => {
    try {
      let movies = await Movies.findOne({$and:
        [{movieName:{$eq:req.body.movieName}},
            {language:{$eq:req.body.language}}]});;
     
      if(movies){
        return  res.status(409).json({message:"Movie Already Exist"})
      }
      movies=await Movies.create(req.body)
      res.status(200).json("Movie added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const updatedMovie = await Movies.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedMovie) {
        return res.status(400).json({ message: "Couldn'nt update your content" });
      }
      return res.status(200).json("updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.delete("/:id",async(req,res)=>{
    try {
        const deleteMovie=await Movies.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteMovie){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteMovies=await Movies.deleteMany(
          {},
      )   
      if(!deleteMovies){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const moviesRouterAdmin = router;