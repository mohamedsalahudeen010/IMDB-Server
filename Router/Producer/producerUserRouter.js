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
      res.status(500).json("Server Error");
    }
  });

  export const producerRouterUser = router;

