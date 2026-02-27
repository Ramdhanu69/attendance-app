const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET all subjects for a SPECIFIC USER
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from the frontend request
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const subjects = await Subject.find({ userId });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// POST new subject linked to a user
router.post('/', async (req, res) => {
  try {
    const newSubject = new Subject({
      name: req.body.name,
      attended: req.body.attended || 0,
      total: req.body.total || 0,
      userId: req.body.userId // Link it to the logged-in user!
    });
    const saved = await newSubject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update existing subject
router.put('/:id', async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(
      req.params.id, 
      { name: req.body.name, attended: req.body.attended, total: req.body.total },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE a subject
router.delete('/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;