const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post).exec();

        if (post) {
            const comment = await Comment.create({
                content: req.body.comment,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            return res.redirect('/');
        }
    } catch (err) {
        console.error('Error adding comment:', err);
        return res.status(500).send('Internal Server Error'); // You can handle the error response as needed
    }
};
