
const express=require("express")
const { UserModel } = require("../models/user_model")
require("dotenv").config()
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const Userroute=express.Router()

Userroute.get("/",async(req,res)=>{
    try{
       const userdata=await UserModel.find()
       res.send(userdata)
    }
    catch(err){
        res.send("Something went wrong")
    }
})

Userroute.post("/signup",async(req,res)=>{
   const {username,email,password,phone}=req.body
    try{
      const data=await UserModel.find({email})
      if(data.length>0){
        res.status(200).send({ msg: "User Already Exist" });
      }
      else{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                res.status(500).send({ msg: "Something went wrong !" });
               console.log(err)
            }
            else{
                const userdata=new UserModel({email,username,password:hash,phone})
        await userdata.save()
        res.status(200).send({ msg: "User registered Successfully" });
        // res.send("user is register")
            }
      })
      }
    }
    catch(err){
        console.log(e)
        res.status(404).send({ msg: "Failed to create new user" });
        // res.send("Something went wrong")
    }

})

Userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body
 
    try{
       const user=await UserModel.find({email})
       console.log(user)
 
       bcrypt.compare(password,user[0].password,(err,result)=>{
         if(result){
             const token = jwt.sign( { userID: user[0]._id }, process.env.secret_key);
            res.send({"msg":"Login successfully","token":token,displayName:user[0].username})
     
         }
         else{
             console.log(err)
             res.send("wrong credential")
         }
       })
       console.log(user)
    
     }
    
    catch(err){
     console.log(err)
    }
    
 
 })
// Userroute.post("/login",async(req,res)=>{

// })

module.exports={Userroute}