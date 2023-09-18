const express=require("express")
const app=express()


const courseRoutes=require("./routes/Course")
const paymentRoutes=require("./routes/Payments")
const profileRoutes=require("./routes/Profile")
const userRoutes=require("./routes/User")


const {dbConnection}=require("./config/databse");
const cookieParser=require("cookie-parser")
const cors=require("cors")//use to entertaint frontend
const {cloudinaryConnect}=require("./config/cloudinary")
require("dotenv").config(); 
const fileupload = require("express-fileupload");

//middleware to pass jsong request body
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "D:\mongo+express\express6\CourseBuy_project_MERN\server\tempFile",
}));
cloudinaryConnect();
dbConnection()

//version:1
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
const router = express.Router()


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`at ${PORT}`);
})

// app.get("/",(req,res)=>{
//     return res.json({
//         sucess:true,
//     message:"your server is running up and running..."
//     })
// })

  

 