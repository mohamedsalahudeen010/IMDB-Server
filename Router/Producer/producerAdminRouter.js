import express from "express"
import Producer from "../../Model/producer.js";


const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const producer = await Producer.find({});
      if (!producer) {
        res.status(400).json({ message: "can't get the Producer data" });
      }
      res.status(200).json(producer);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.post("/", async (req, res) => {
    try {
      let producer = await Producer.findOne({name:{$eq:req.body.name}});
      console.log(producer)
      if(producer){
        return  res.status(409).json({message:"Producer  Already Exist"})
      }
      producer=await Producer.create(req.body)
      return res.status(200).json("Producer added Successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error");
    }
  });


  router.put("/:id", async (req, res) => {
    console.log("gggggggg")
    try {
      const updatedProducer= await Producer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProducer) {
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
        const deleteMovie=await Producer.findByIdAndDelete(
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
      const deleteProducers=await Producer.deleteMany(
          {},
      )   
      if(!deleteProducers){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const producerRouterAdmin = router;