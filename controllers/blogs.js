const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// CREATE
router.post('/', async (req, res) => {
    try {
        const { title, body, image } = req.body;
        const newBlog = new Blog({ title, body, image });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(deletedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
