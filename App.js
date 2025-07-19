const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const app=express()

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(4000,(error)=>{console.log("Server Running")+error})