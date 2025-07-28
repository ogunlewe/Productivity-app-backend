const express = require('express');
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  getChallenge,
  joinChallenge
} = require('../controllers/challengeController');

const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createChallenge);
router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.post('/:id/join', protect, joinChallenge);

module.exports = router;
