const express=require('express');
const  router= express.Router();
const user = require('../config/signupCollection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET;
//routes



//signup route

router.post('/signup', async (req,res)=>{
    console.log(req.body);
    try {
        const{firstName, lastName, email, password, role} =req.body;
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            firstName: firstName,
            lastName: lastName,
            email,
            password: hashedPassword,
            role: role
        })
await newUser.save();
res.status(201).json({message:"Signup successful! Please login."});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }

  
 

})


//signin route

router.post("/signin", async (req, res) => {
  try {
    // console.log("I am getting called");
    // console.log(req.body); // DEBUG

    const { email, password } = req.body;

    const User = await user.findOne({ email });

    if (!User) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: User._id, role: User.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Signin successful!",
      token,
      user: {
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add this route temporarily
router.get('/all-users', async (req, res) => {
    try {
        const allUsers = await user.find(); // hide password
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});


module.exports = router;



