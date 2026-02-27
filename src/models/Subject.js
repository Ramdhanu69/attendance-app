const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  attended: { 
    type: Number, 
    default: 0,
    min: 0
  },
  total: { 
    type: Number, 
    default: 0,
    min: 0
  },
  // NEW FIELD: This tells MongoDB exactly which user owns this subject
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

subjectSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Subject', subjectSchema);