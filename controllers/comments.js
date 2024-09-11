const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// CREATE Comment
router.post('/:blogId', async (req, res) => {
    try {
        const { paragraph } = req.body;
        const blogId = req.params.blogId;

        const newComment = new Comment({ blog: blogId, paragraph });
        const savedComment = await newComment.save();

        await Blog.findByIdAndUpdate(blogId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL COMMENTS FOR A BLOG
router.get('/:blogId', async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });

        await Blog.updateOne({ comments: req.params.id }, { $pull: { comments: req.params.id } });

        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
