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
      res.status(500).json({ message: "Server Error"});
    }
  });

  export const actorRouterUser = router;

