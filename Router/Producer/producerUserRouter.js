import express from "express"
import Producer from "../../Model/producer.js";

const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const producer = await Producer.find({});
      if (!producer) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(producer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  export const producerRouterUser = router;

 router.post("/", async (req, res) => {
    try {
      let producer = await Producer.findOne({name:{$eq:req.body.name}});
      console.log(producer)
      if(producer){
        return  res.status(409).json({message:"Producer  Already Exist"})
      }
      producer=await Producer.create(req.body)
      return res.status(200).json({ message:"Producer added Successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message:"Internal Server Error"});
    }
  });


  router.put("/:id", async (req, res) => {
   
    try {
      const updatedProducer= await Producer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProducer) {
        return res.status(400).json({ message: "Couldn'nt update your data" });
      }
      return res.status(200).json({ message:"updated Successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
