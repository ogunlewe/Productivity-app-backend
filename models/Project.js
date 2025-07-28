const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  techStack: [String],
  repoLink: String,
  screenshots: [String], 
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
