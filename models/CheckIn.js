const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  content: { type: String },
  mood: { type: String }, // optional emoji vibe
  images: [String], // image URLs 
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

checkInSchema.index({ user: 1, challenge: 1, date: 1 }); // for fast lookup

module.exports = mongoose.model('CheckIn', checkInSchema);
