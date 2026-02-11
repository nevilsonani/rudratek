const Project = require('../models/Project');

class ProjectController {
  static async createProject(req, res) {
    try {
      const { name, clientName, status, startDate, endDate } = req.body;

      // Validation
      if (!name || !clientName || !status || !startDate) {
        return res.status(400).json({
          error: 'Missing required fields: name, clientName, status, startDate'
        });
      }

      if (!['active', 'on_hold', 'completed'].includes(status)) {
        return res.status(400).json({
          error: 'Invalid status. Must be: active, on_hold, or completed'
        });
      }

      if (endDate && new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
          error: 'endDate must be greater than or equal to startDate'
        });
      }

      const project = await Project.create({
        name,
        clientName,
        status,
        startDate,
        endDate
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjects(req, res) {
    try {
      const { status, search, sortBy, sortOrder } = req.query;
      
      const filters = {
        status,
        search,
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder || 'DESC'
      };

      // Validate sortBy
      const validSortFields = ['createdAt', 'startDate'];
      if (!validSortFields.includes(filters.sortBy)) {
        return res.status(400).json({
          error: `Invalid sortBy field. Must be: ${validSortFields.join(', ')}`
        });
      }

      // Validate sortOrder
      if (!['ASC', 'DESC'].includes(filters.sortOrder)) {
        return res.status(400).json({
          error: 'Invalid sortOrder. Must be: ASC or DESC'
        });
      }

      const projects = await Project.findAll(filters);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid project ID is required'
        });
      }

      const project = await Project.findById(parseInt(id));
      
      if (!project) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateProjectStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid project ID is required'
        });
      }

      if (!status) {
        return res.status(400).json({
          error: 'Status is required'
        });
      }

      if (!['active', 'on_hold', 'completed'].includes(status)) {
        return res.status(400).json({
          error: 'Invalid status. Must be: active, on_hold, or completed'
        });
      }

      // Get current project to check status transition
      const currentProject = await Project.findById(parseInt(id));
      
      if (!currentProject) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      // Validate status transition
      if (!Project.isValidStatusTransition(currentProject.status, status)) {
        return res.status(400).json({
          error: `Invalid status transition from ${currentProject.status} to ${status}`
        });
      }

      const updated = await Project.updateStatus(parseInt(id), status);
      
      if (!updated) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      const updatedProject = await Project.findById(parseInt(id));
      res.json(updatedProject);
    } catch (error) {
      console.error('Error updating project status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteProject(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid project ID is required'
        });
      }

      const deleted = await Project.softDelete(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProjectController;
