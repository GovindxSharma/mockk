const Post = require("../models/post");

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        console.log('Post created successfully:', post);
        return res.redirect('back');
    } catch (err) {
        console.error('Error creating Post:', err);
        return res.status(500).send('Internal Server Error'); // You can handle the error response as needed
    }
};


