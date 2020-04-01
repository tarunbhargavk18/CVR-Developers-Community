/*IMPORTS*/

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

/*ROUTES*/

//ROUTE: GET api/auth
//DESCRIPTION: Get authenticated user details
//Authenticated
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//ROUTE: POST api/auth
//DESCRIPTION: Authenticate a User and get the token
//Public
router.post(
  "/",
  [
    check("rollNumber", "Enter a valid Roll Number").isLength({
      min: 10,
      max: 10
    }),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() }); //Errors in the form of JSON array
    }

    const { rollNumber, password } = req.body;

    try {
      //Check if the user exists
      let user = await User.findOne({ rollNumber });

      //If user does not exist
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              message: "Invalid Credentials"
            }
          ]
        });
      }

      //If passwords do not match
      if (password != user.password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

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
          res.json({ token }); //Sending the token back
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
