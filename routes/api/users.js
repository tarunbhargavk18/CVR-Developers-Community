const express = require("express");
const router = express.Router();

//Password Hashing
//const bcrypt = require("bcrypt");

//Validation 
const { check, validationResult } = require("express-validator");

//User Model
const User = require("../../models/User");

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("rollNumber", "Enter a valid Roll Number").isLength({
      min: 10,
      max: 10
    }),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Re-enter password with a minimum length of 5").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() }); //Errors in the form of JSON array
    }

    const { name, rollNumber, email, password } = req.body;

    try {

      //Check if the user exists already
      let user = await User.findOne({rollNumber});

      if(user){
        res.status(400).json({errors:[{"message":"There exists an account already for this roll number"}]});
      }

      //Creating a new user
      user = new User({
        name,
        rollNumber,
        email,
        password
      })

      await user.save();

      //Testing
      res.send("User Registered");
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
