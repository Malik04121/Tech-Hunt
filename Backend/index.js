const cors = require("cors");

const express=require("express")
const {connection}=require("./config/db");
const { adminRoute } = require("./routes/admin_route");
require("dotenv").config()

const { productroute } = require("./routes/Product_route");
const { Userroute } = require("./routes/User_route");

const app=express()
app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to home page")
  })
app.use("/product",productroute)
app.use("/user",Userroute)

app.use("/admin",adminRoute)

app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})
