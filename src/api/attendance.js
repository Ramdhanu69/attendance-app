const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const { readData, writeData } = require('../utils/storage');

// POST /subjects/:id/attendance
router.post('/:id/attendance', (req, res) => {
  const { id } = req.params;
  const { date, attended } = req.body;
  if (typeof attended !== 'boolean' || !date) {
    return res.status(400).json({ error: 'date and attended boolean required' });
  }
  const data = readData();
  const subj = data.subjects.find(s => s.id === id);
  if (!subj) {
    return res.status(404).json({ error: 'subject not found' });
  }
  // merge same-day
  let rec = data.attendance.find(r => r.subjectId === id && r.date === date);
  if (rec) {
    rec.attended = attended;
  } else {
    rec = { id: uuid(), subjectId: id, date, attended };
    data.attendance.push(rec);
  }
  // update counters
  if (attended) {
    subj.attended += 1;
    subj.total += 1;
  } else {
    subj.total += 1;
  }
  writeData(data);
  res.json(rec);
});

module.exports = router;
