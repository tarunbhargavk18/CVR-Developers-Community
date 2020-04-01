/*IMPORTS*/

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

//Password Hashing
//const bcrypt = require("bcrypt");

//Validation
const { check, validationResult } = require("express-validator");

//User Model
const User = require("../../models/User");

/*ROUTES*/

//ROUTE: POST api/users
//DESCRIPTION: Register a User
//Public
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

    //Handling validation errors
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() }); //Errors in the form of JSON array
    }

    const { name, rollNumber, email, password } = req.body;

    try {
      //Check if the user exists already
      let user = await User.findOne({ rollNumber });

      //If a user already exists
      if (user) {
        res.status(400).json({
          errors: [
            {
              message: "There exists an account already for this roll number"
            }
          ]
        });
      }

      //Creating a new user
      user = new User({
        name,
        rollNumber,
        email,
        password
      });

      await user.save();

      //Loggin user in after registering
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // //Testing
      // res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/*EXPORTS*/
module.exports = router;
