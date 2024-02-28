import express from "express"
import Movies from "../../Model/movies.js";


const router=express.Router();

  router.get("/", async (req, res) => {

    const search=req.query.search;
    
      try {
        if(search){
          const products = await Movies.find({$or:[
          {movieName:{$regex:search,$options:`i`}},
          {genre:{$regex:search,$options:`i`}},
          {language:{$regex:search,$options:`i`}},
          {industry:{$regex:search,$options:`i`}},
          {leadActorName:{$regex:search,$options:`i`}},
          {actorName:{$regex:search,$options:`i`}},
          {directorName:{$regex:search,$options:`i`}},
          {producerName:{$regex:search,$options:`i`}},
          {musicDirectorName:{$regex:search,$options:`i`}},
          {year:search},
        ]}).sort({year:-1});;
          if (!products) {
            res.status(400).json({ message: "can't get the data" });
          }
          res.status(200).json(products);
        }
        else{
          const movies = await Movies.find({}).sort({year:1});
        if (!movies) {
          res.status(400).json({ message: "can't get the data" });
        }
        res.status(200).json(movies);
      }
      } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
      }
    });
  

    
  router.get("one/", async (req, res) => {
    const {search}=req.query;
      try {
        if(search){
          const products = await Movies.find({$or:[
          {leadActorName:search,$options:"i"},
          {actorName:search},
          {directorName:search},
          {musicDirectorName:search},
        ]}).sort({year:1});;
          if (!products) {
            res.status(400).json({ message: "can't get the data" });
          }
          res.status(200).json(products);
        }
        else{
          const movies = await Movies.find({}).sort({year:1});
        if (!movies) {
          res.status(400).json({ message: "can't get the data" });
        }
        res.status(200).json(movies);
      }
      } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
      }
    });



  router.get("/:id", async (req, res) => {
   
    try {
      const movies = await Movies.findOne({_id:req.params.id});
      if (!movies) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  router.put("rating/:id", async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const updatedMovie = await Movies.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {"rating":req.body.rating} },
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


  export const moviesRouterUser = router;

