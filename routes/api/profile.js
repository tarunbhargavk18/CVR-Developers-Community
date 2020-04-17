/*IMPORTS*/

const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

/*ROUTES*/

// GET api/profile/me
// It gets the current user's profile
// Authenticated
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "rollNumber"]);

    if (!profile) {
      return res.status(400).json({ msg: "Requested profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST api/profile
// Create or update a user profile
// Authenticated
router.post("/", auth, async (req, res) => {
  const {
    branch,
    bio,
    skills,
    githubusername,
    twitter,
    linkedin,
    hackerrank,
    codechef,
    codeforces,
    interviewBit,
    phone,
    email,
  } = req.body;

  //Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (branch) profileFields.branch = branch;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (phone) profileFields.phone = phone;
  if (email) profileFields.email = email;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  //Build social object
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (linkedin) profileFields.social.linkedin = linkedin;

  //Build coding profiles object
  profileFields.codingprofiles = {};
  if (hackerrank) profileFields.codingprofiles.hackerrank = hackerrank;
  if (codechef) profileFields.codingprofiles.codechef = codechef;
  if (codeforces) profileFields.codingprofiles.codeforces = codeforces;
  if (interviewBit) profileFields.codingprofiles.interviewBit = interviewBit;

  try {
    let profile = await Profile.findOne({ user: req.user.id }); //Fetching the profile

    //If Profile already exists
    if (profile) {
      //Update if profile already exists
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //Create new profile if does not exist already
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE: GET api/profile
// DESCRIPTION: Get all profiles
// Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "rollNumber",
    ]); //Get all profiles
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE: GET api/profile/user/:user_id
// DESCRIPTION: Get profile by user ID
// Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "rollNumber"]);

    //Check if profile exists
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE: DELETE api/profile
// DESCRIPTION: Delete profile user and posts
// Authenticated
router.delete("/", auth, async (req, res) => {
  try {
    //@todo remove posts
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id }); // Delete from Profile Model
    await User.findOneAndRemove({ _id: req.user.id }); //Delete from User Model
    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE: PUT api/profile/projects
// DESCRIPTION: Add profile projects
// Authenticated
router.put(
  "/projects",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { title, description, techstack } = req.body;

    const newProject = { title };
    if (techstack) {
      newProject.techstack = techstack.split(",").map((tech) => tech.trim()); //Techstack has comma separated values
    }
    if (description) {
      newProject.description = description;
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.projects.unshift(newProject);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE: DELETE api/profile/projects/:project_id
// DESCRIPTION: Delete profile project
// Authenticated
router.delete("/projects/:project_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Getting index of the project to be deleted
    const removeIndex = profile.projects
      .map((item) => item.id)
      .indexOf(req.params.project_id);

    profile.projects.splice(removeIndex, 1); // Remove the project
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE: GET api/profile/github/:username
// DESCRIPTION: Get user repos from Github
// Public
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const gitHubResponse = await axios.get(uri);
    if (gitHubResponse.status != 200) {
      // This error handling is not working
      return res.status(404).json({ msg: "Profile not found!" });
    }
    res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*EXPORTS*/
module.exports = router;
