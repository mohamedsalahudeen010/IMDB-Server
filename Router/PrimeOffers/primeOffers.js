import express from "express";
import PrimeOffer from "../../Model/PrimeOffers.js";

const router=express.Router()

router.get("/", async (req, res) => {
    try {
      const PrimeOffer = await PrimeOffer.find({});
      if (!PrimeOffer) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(PrimeOffer);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });




  export const primeOffers = router;