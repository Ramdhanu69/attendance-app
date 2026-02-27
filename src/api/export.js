const express = require('express');
const router = express.Router();
const { readData } = require('../utils/storage');
const { subjectsToCsv } = require('../utils/csvExporter');

// GET /export/csv
router.get('/csv', (req, res) => {
  const data = readData();
  const csv = subjectsToCsv(data.subjects);
  res.setHeader('Content-Type', 'text/csv');
  res.send(csv);
});

module.exports = router;
