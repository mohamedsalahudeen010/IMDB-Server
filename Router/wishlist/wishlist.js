import express from "express"
import WishList from "../../Model/wishList.js";




const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const wishList = await WishList.findOne({email:req.query.email});
      if (!wishList) {
        res.status(400).json({ message: "There is No Wishlist" });
      }
      res.status(200).json(wishList);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.post("/", async (req, res) => {
    try {
        let wishList=await WishList.findOne({email:req.body.email})
   
        if(!wishList){
          wishList=await new WishList({
            name:req.body.name,
        email:req.body.email,
        movies:req.body.movies
          }).save()
          return res.status(200).json("Added Successfully");
        }
     
        wishList=await WishList.updateOne(
       {email:req.body.email},
       {$push:{movies:req.body.movies}}
       )
      return res.status(200).json("Added Successfully"); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/delete/:id",async(req,res)=>{
    try {
        let deleteMovie=await WishList.findOne({email:req.body.email})   
        if(!deleteMovie){return res.status(400).json({message:"Couldn'nt delete your content"})}
        deleteMovie=await WishList.updateOne(
          {email:req.body.email},
          {$pull:{movies:{_id:req.params.id}}}
          )
          return res.status(200).json("Deleted Successfully"); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }   
})

  router.put("deleteAll/", async (req, res) => {

    try {
        let removeWishList= await WishList.findOneAndUpdate(
        { email: req.body.email },
        { $set: { movies:[]  }},
        { new: true }
      );
      if (!removeWishList) {
        return res.status(400).json({ message: "Couldn'nt remove" });
      }
      return res.status(200).json("Successfully Removed");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  export const wishListUser = router;