const Project = require('../models/Project');

// @desc    Create new project
exports.createProject = async (req, res) => {
  const { title, description, challenge, techStack, repoLink, screenshots } = req.body;

  if (!title || !challenge) {
    return res.status(400).json({ message: 'Title and challenge are required.' });
  }

  const project = await Project.create({
    title,
    description,
    challenge,
    techStack,
    repoLink,
    screenshots,
    owner: req.user._id,
  });

  res.status(201).json(project);
};

// @desc    Get all projects
exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().populate('owner', 'username').populate('challenge', 'title');
  res.json(projects);
};

// @desc    Get my projects
exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).populate('challenge', 'title');
  res.json(projects);
};

// @desc    Get single project
exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('owner', 'username').populate('challenge', 'title');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

// @desc    Update project
exports.updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this project' });
  }

  const updates = req.body;
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updatedProject);
};
