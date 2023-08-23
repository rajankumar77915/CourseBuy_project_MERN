const express=require("express")
const app=express()
const {routes}=require("./routes/routes")
require("./config/databse").dbConnection();
require("dotenv").config();
const fileupload = require("express-fileupload");


//middleware to pass jsong request body
app.use(express.json());
//version:1
app.use("api/v1",routes);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`at ${PORT}`);
 })

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "D:\mongo+express\express6\CourseBuy_project_MERN\server\tempFile",
}));