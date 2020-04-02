/*IMPORTS*/
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

/*ROUTES*/

//ROUTE: POST api/feed/
//Create a post in the posts feed
//Authenticated
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever Error");
    }
  }
);

//ROUTE: GET api/feed/
//Display all posts
//Authenticated
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //Sort by latest first
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

//ROUTE: GET api/feed/:id
//Get post by ID
//Authenticated
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Requested Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

//ROUTE: Delete api/feed/:id
//Delete a post
//Authenticated
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check if post to be deleted is of the user
    if (post.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to perform that action" });
    }

    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

//ROUTE: PUT api/feed/like/:id
//Like a post
//Authenticated
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post is already liked by user
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

//ROUTE: PUT api/feed/unlike/:id
//Unlike a post
//Authenticated
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post is already liked by user
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length == 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }

    //Get index of the like to be deleted
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

//ROUTE: POST api/feed/comment/:id
//Comment on a post
//Authenticated
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever Error");
    }
  }
);

module.exports = router;
