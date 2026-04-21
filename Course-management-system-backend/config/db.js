const mongoose = require("mongoose");
const express = require("express");

const connectDB=mongoose.connect('mongodb://127.0.0.1:27017/managementSystem').then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Failed to connect to database");
})

module.exports=connectDB;

