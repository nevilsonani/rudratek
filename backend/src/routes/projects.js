const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

// POST /projects - Create a new project
router.post('/', ProjectController.createProject);

// GET /projects - List all projects with filters
router.get('/', ProjectController.getProjects);

// GET /projects/:id - Get a specific project
router.get('/:id', ProjectController.getProjectById);

// PATCH /projects/:id/status - Update project status
router.patch('/:id/status', ProjectController.updateProjectStatus);

// DELETE /projects/:id - Soft delete a project
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
