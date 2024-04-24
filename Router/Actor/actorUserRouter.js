import express from "express"
import Actor from "../../Model/actors.js";

const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const actor = await Actor.find({});
      if (!actor) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(actor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message:"Internal Server Error"});
    }
  });

  export const actorRouterUser = router;

 router.post("/", async (req, res) => {
    try {
      let actor = await Actor.findOne({name:req.body.name});;
      if(actor){
        return  res.status(409).json({message:"Actor Already Exist"})
      }
      actor=await Actor.create(req.body)
      return res.status(200).json({message:"Actor data added Successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Internal Server Error"});
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const updatedActor= await Actor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedActor) {
        return res.status(400).json({ message: "Couldn'nt update your content" });
      }
      return res.status(200).json({ message:"updated Successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

