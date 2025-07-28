const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject
} = require('../controllers/projectController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createProject);
router.get('/', getAllProjects);
router.get('/me', protect, getMyProjects);
router.get('/:id', getProjectById);
router.put('/:id', protect, updateProject);

module.exports = router;
