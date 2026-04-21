const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose')

const signupSchema= new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
     role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    }

})

const user = mongoose.model("user", signupSchema);

module.exports=user;