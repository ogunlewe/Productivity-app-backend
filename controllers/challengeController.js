const Challenge = require('../models/Challenge');

// @desc    Create new challenge
exports.createChallenge = async (req, res) => {
  const { title, description, duration, tags } = req.body;

  if (!title || !duration) {
    return res.status(400).json({ message: 'Title and duration are required.' });
  }

  const challenge = await Challenge.create({
    title,
    description,
    duration,
    creator: req.user._id,
    participants: [req.user._id],
    tags,
  });

  res.status(201).json(challenge);
};

// @desc    Get all challenges
exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find().populate('creator', 'username').sort('-createdAt');
  res.json(challenges);
};

// @desc    Get single challenge
exports.getChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id).populate('creator', 'username');
  if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
  res.json(challenge);
};

// @desc    Join challenge
exports.joinChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

  if (challenge.participants.includes(req.user._id)) {
    return res.status(400).json({ message: 'Already joined this challenge' });
  }

  challenge.participants.push(req.user._id);
  await challenge.save();

  res.json({ message: 'Challenge joined successfully' });
};
