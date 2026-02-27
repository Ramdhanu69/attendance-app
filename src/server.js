const path = require('path');
// 🟢 FIXED: Removed the '..' because the file is right next to server.js
require('dotenv').config({ path: path.join(__dirname, 'secure.env') });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const subjectsRouter = require('./api/subjects');
const attendanceRouter = require('./api/attendance');
const exportRouter = require('./api/export');
const authRouter = require('./api/auth');

const app = express();
app.use(bodyParser.json());

// Serve static client files from /src
app.use(express.static(path.join(__dirname)));

// MONGODB CONNECTION
if (!process.env.MONGO_URI) {
    console.error('🔴 ERROR: MONGO_URI is STILL undefined.');
} else {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('🟢 Connected to MongoDB Atlas (Cloud)!'))
      .catch(err => console.error('🔴 MongoDB connection error:', err));
}

app.use('/subjects', subjectsRouter);
app.use('/subjects', attendanceRouter); 
app.use('/export', exportRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});