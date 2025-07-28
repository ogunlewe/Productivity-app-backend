const CheckIn = require('../models/CheckIn');

// @desc    Create a daily check-in
exports.createCheckIn = async (req, res) => {
  const { challenge, content, mood, project, images } = req.body;

  // Check if user already checked in today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingCheckIn = await CheckIn.findOne({
    user: req.user._id,
    challenge,
    date: { $gte: today }
  });

  if (existingCheckIn) {
    return res.status(400).json({ message: 'Already checked in today' });
  }

  const newCheckIn = await CheckIn.create({
    user: req.user._id,
    challenge,
    content,
    mood,
    project,
    images,
  });

  res.status(201).json(newCheckIn);
};

// @desc    Get all check-ins for a user
exports.getMyCheckIns = async (req, res) => {
  const checkIns = await CheckIn.find({ user: req.user._id }).populate('challenge', 'title').sort('-createdAt');
  res.json(checkIns);
};

// @desc    Get check-ins for a specific challenge
exports.getChallengeCheckIns = async (req, res) => {
  const { challengeId } = req.params;
  const checkIns = await CheckIn.find({ challenge: challengeId }).populate('user', 'username').sort('-createdAt');
  res.json(checkIns);
};
