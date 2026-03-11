//imports
const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT=process.env.URI


//middileware






//server
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT} `);
})