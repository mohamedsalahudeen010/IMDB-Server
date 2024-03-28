import express from "express"
import Actor from "../../Model/actors.js";


const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const actor = await Actor.find({});
      if (!actor) {
        res.status(400).json({ message: "can't get the Actor data" });
      }
      res.status(200).json({data:actor,message:"Actor get Successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal Server Error"});
    }
  });


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


  router.delete("/:id",async(req,res)=>{
    try {
        const deleteActor=await Actor.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteActor){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteActors=await Actor.deleteMany(
          {},
      )   
      if(!deleteActors){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      
      return res.status(500).json({message:"Internal server error"})
  }

  
})


  export const actorRouterAdmin = router;
