const express = require('express');
const router = express.Router();
const { createCheckIn, getMyCheckIns, getChallengeCheckIns } = require('../controllers/checkinController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createCheckIn);
router.get('/me', protect, getMyCheckIns);
router.get('/challenge/:challengeId', protect, getChallengeCheckIns);

module.exports = router;
