import express from "express"
 const app=express();
 import cors from "cors"
 app.use(cors())
 import dotenv from "dotenv"
 dotenv.config();
 import dbConnection from "./DB.js";
import { userLoginRouter } from "./Router/User/userLogInRoute.js";
import { userSignUpRouter } from "./Router/User/userSignUpRoute.js";
import { adminLoginRouter } from "./Router/Admin/adminLogInRoute.js";
import { adminSignUpRouter } from "./Router/Admin/adminSignUpRoute.js";
import { primeOffers } from "./Router/PrimeOffers/primeOffers.js";
import { primeOffersAdmin } from "./Router/PrimeOffers/primeOffersAdmin.js";
import { isSignedInUser } from "./controllers/authUser.js";
import { isSignedInAdmin } from "./controllers/authAdmin.js";

import { producerRouterUser } from "./Router/Producer/producerUserRouter.js";
import { producerRouterAdmin } from "./Router/Producer/producerAdminRouter.js";
import { wishListUser } from "./Router/wishlist/wishlist.js";
import { actorRouterUser } from "./Router/Actor/actorUserRouter.js";
import { actorRouterAdmin } from "./Router/Actor/actorAdminRouter.js";
import { moviesRouterUser } from "./Router/Movies/moviesUserRouter.js";
import { moviesRouterAdmin } from "./Router/Movies/moviesAdminRouter.js";



 dbConnection()

 const PORT=process.env.PORT
 app.listen(PORT,()=>{
    console.log(`server is hoisted in ${PORT}`)
 })

 app.use(express.json())
 app.get("/",async(req,res)=>{
    res.send(`Web server Is Hoisted In ${PORT} Port Number`)
 })

app.use("/userLogin",userLoginRouter);
app.use("/userSignUp",userSignUpRouter);
app.use("/adminLogin",adminLoginRouter);
app.use("/adminSignUp",adminSignUpRouter);
app.use("/primeOffers",isSignedInUser,primeOffers);
app.use("/primeOffersAdmin",isSignedInAdmin,primeOffersAdmin);
app.use("/movies",moviesRouterUser);
app.use("/moviesAdmin",isSignedInAdmin,moviesRouterAdmin);
app.use("/producer",producerRouterUser);
app.use("/producerAdmin",isSignedInAdmin,producerRouterAdmin);
app.use("/actor",actorRouterUser);
app.use("/actorAdmin",isSignedInAdmin,actorRouterAdmin);
app.use("/wishList",isSignedInUser,wishListUser);





