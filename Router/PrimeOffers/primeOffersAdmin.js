import express from "express";
import PrimeOffer from "../../Model/PrimeOffers.js";

const router=express.Router()

router.get("/", async (req, res) => {
    try {
      const primeOffer = await PrimeOffer.find({});
      if (!primeOffer) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(primeOffer);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  
  router.post("/", async (req, res) => {
    let {images}=req.body
    try {
      let primeOffer = await PrimeOffer.findOne({images:images});
      if(primeOffer){
        return  res.status(409).json({message:"Image Already Exist"})
      }
      primeOffer=await PrimeOffer.create(req.body)
      res.status(200).json("Products added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.delete("/:id",async(req,res)=>{
    try {
        const deleteContent=await PrimeOffer.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteContent){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteWholeImages=await PrimeOffer.deleteMany(
          {},
      )   
      if(!deleteWholeImages){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})




  export const primeOffersAdmin = router;