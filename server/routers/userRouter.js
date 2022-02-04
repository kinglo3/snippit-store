const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    try {
      const { email, password, passwordVerify } = req.body;
  
      // validation
  
      if (!email || !password || !passwordVerify)
        return res.status(400).json({
          errorMessage: "Please enter all required fields.",
        });
  
      if (password.length < 6)
        return res.status(400).json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });
  
      if (password !== passwordVerify)
        return res.status(400).json({
          errorMessage: "Please enter the password twice for verification.",
        });
        
        //check for existing user account

      const existsingUser = await User.findOne({ email });
      if (existsingUser)
        return res.status(400).json({
            errorMessage: "An acccount with this email already exists",
        });

        //password hashing

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //store user in database

        const newUser = new User ({
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

        //create JWT

        const token = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true }).send();

    } catch(err) {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // validation
    
        if (!email || !password)
          return res.status(400).json({
            errorMessage: "Please enter all required fields.",
          });
          
          //get user account
  
        const existingUser = await User.findOne({ email });
        if (!existingUser)
          return res.status(401).json({
              errorMessage: "Wrong email or password.",
          });

          const correctPassword = await bcrypt.compare(password, existingUser, passwordHash);

          if (!correctPassword)
          return res.status(401).json({
            errorMessage: "Wrong email or password.",
        });
  
          //create JWT
  
          const token = jwt.sign({
              id: existingUser._id
          }, process.env.JWT_SECRET);
  
          res.cookie("token", token, { httpOnly: true }).send();
  
      } catch(err) {
          res.status(500).send();
      }
});

module.exports = router;