const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    console.log("Post created successfully:", post);
    return res.redirect("back");
  } catch (err) {
    console.error("Error creating Post:", err);
    return res.status(500).send("Internal Server Error"); // You can handle the error response as needed
  }
};

module.exports.destroy = async function (req, res) {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id).exec();

    // Check if the post exists and if the logged-in user is the owner of the post
    if (post && post.user == req.user.id) {
      // Remove the post
      await Post.deleteOne({ _id: req.params.id });

      // Delete all comments associated with the post
      await Comment.deleteMany({ post: req.params.id });

      return res.redirect("back");
    } else {
      console.log("Unauthorized deletion attempt or post not found.");
      return res.redirect("back");
    }
  } catch (err) {
    // Handle errors and log them
    console.error("Error in destroying post:", err);
    return res.status(500).send("Internal Server Error");
  }
};
