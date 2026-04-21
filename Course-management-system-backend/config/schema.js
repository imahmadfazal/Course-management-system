const express =require('express');
const mongoose=require('mongoose');


const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
     age: Number,
    course: String,
    rollNo:{ type: Number, unique: true },
    section:{ type: String },
    degree:{ type: String },
     image: String

},{ timestamps: true });

const student = new mongoose.model("student", studentSchema);

//student is the modelname and  studentSchema is the schema name

module.exports=student;