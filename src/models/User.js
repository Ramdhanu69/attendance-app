const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, // Prevents two friends from having the same username
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// This formats the data for your React frontend (changes _id to id, hides password)
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Security: Never send the password back to the frontend!
  }
});

module.exports = mongoose.model('User', userSchema);