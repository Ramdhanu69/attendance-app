const fs = require('fs');
const path = require('path');

// Simple JSON file storage to persist data between server restarts.
const DATA_FILE = path.join(__dirname, '..', 'data.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { subjects: [], attendance: [], users: [] };
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { subjects: [], attendance: [], users: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readData,
  writeData,
};
