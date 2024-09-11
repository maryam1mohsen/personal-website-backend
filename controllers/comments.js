const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// CREATE
router.post('/:blogId', async (req, res) => {
    try {
        const { paragraph } = req.body;
        const blogId = req.params.blogId;
        const newComment = new Comment({ blog: blogId, paragraph });
        const savedComment = await newComment.save();
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

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
