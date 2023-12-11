const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post).exec();

    if (post) {
      const comment = await Comment.create({
        content: req.body.comment,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      return res.redirect("/");
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    return res.status(500).send("Internal Server Error"); // You can handle the error response as needed
  }
};

module.exports.destroy = async function (req, res) {
  try {
    // Find the comment by ID
    const comment = await Comment.findById(req.params.id).exec();

    // Check if the comment exists and if the logged-in user is the owner of the comment
    if (comment && comment.user == req.user.id) {
      // Store the post ID before removing the comment
      const postId = comment.post;

      // Remove the comment using the deleteOne method
      await Comment.deleteOne({ _id: req.params.id }).exec();

      // Update the Post document to pull the comment ID from the comments array
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).exec();

      return res.redirect("back");
    } else {
      console.log("Unauthorized deletion attempt or comment not found.");
      return res.redirect("back");
    }
  } catch (err) {
    // Handle errors and log them
    console.error("Error in destroying comment:", err);
    return res.status(500).send("Internal Server Error");
  }
};
