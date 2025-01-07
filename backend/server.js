import express from "express"
import dontenv from "dotenv"
import cookieParser from  "cookie-parser"
import connectDB from "./db/connectionDB.js"
import cloudinary from "cloudinary";
import cors from 'cors';
import path from 'path';


import postRoute from "./routes/posts.route.js"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import notificationRoute from "./routes/notificationRoute.js"

dontenv.config()
const app = express();
const __dirname  = path.resolve();

cloudinary.config({
    cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY

})
 app.use(cors({
    origin : "http://localhost:3000",
    credentials : true,

 }))


const PORT = process.env.PORT;



app.use(express.json(
    {
        limit : "5mb" //default value : 100kb
    }
));
app.use(cookieParser());
app.use(express.urlencoded({
    extended : true 
}))

app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/Posts", postRoute);
app.use("/api/notification" , notificationRoute)



 

 



 



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/build")))
    app.use("*",(req,res) =>{
        res.sendFile(path.resolve*__dirname,"frontend","build","index.html")
    })
}
  

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
    connectDB();
    
})