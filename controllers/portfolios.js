const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// CREATE
router.post('/', async (req, res) => {
    try {
        const { title, description, softwaresUsed, link } = req.body;
        const newPortfolio = new Portfolio({ title, description, softwaresUsed, link });
        const savedPortfolio = await newPortfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json(portfolios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(updatedPortfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
        if (!deletedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(deletedPortfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
