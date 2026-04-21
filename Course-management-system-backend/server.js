//imports
const express = require('express');
const app = express();
const studentRoute=require('./routes/student.routes');
const connectDB=require('./config/db');
const multer = require('multer');
const cors = require('cors');
const authRoutes= require('./routes/authentication');








const dotenv = require("dotenv");
dotenv.config();
const PORT=process.env.URI;





//middileware

app.use(cors());
app.use(express.json());


app.use('/authentication/user',authRoutes);
app.use('/student/api',studentRoute);
app.use('/uploads',express.static('uploads'));









//server
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT} `);
})