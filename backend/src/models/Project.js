const db = require('../database/connection');

class Project {
  static async create(projectData) {
    const { name, clientName, status, startDate, endDate } = projectData;
    
    const sql = `
      INSERT INTO projects (name, clientName, status, startDate, endDate)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await db.run(sql, [name, clientName, status, startDate, endDate]);
    return this.findById(result.id);
  }

  static async findAll(filters = {}) {
    let sql = `
      SELECT id, name, clientName, status, startDate, endDate, createdAt, updatedAt
      FROM projects 
      WHERE deletedAt IS NULL
    `;
    const params = [];

    // Add status filter
    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    // Add search filter (name or clientName)
    if (filters.search) {
      sql += ' AND (name LIKE ? OR clientName LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    // Add sorting
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'DESC';
    sql += ` ORDER BY ${sortBy} ${sortOrder}`;

    return await db.all(sql, params);
  }

  static async findById(id) {
    const sql = `
      SELECT id, name, clientName, status, startDate, endDate, createdAt, updatedAt
      FROM projects 
      WHERE id = ? AND deletedAt IS NULL
    `;
    
    return await db.get(sql, [id]);
  }

  static async updateStatus(id, newStatus) {
    const sql = `
      UPDATE projects 
      SET status = ?, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ? AND deletedAt IS NULL
    `;
    
    const result = await db.run(sql, [newStatus, id]);
    return result.changes > 0;
  }

  static async softDelete(id) {
    const sql = `
      UPDATE projects 
      SET deletedAt = CURRENT_TIMESTAMP 
      WHERE id = ? AND deletedAt IS NULL
    `;
    
    const result = await db.run(sql, [id]);
    return result.changes > 0;
  }

  static isValidStatusTransition(currentStatus, newStatus) {
    const transitions = {
      'active': ['on_hold', 'completed'],
      'on_hold': ['active', 'completed'],
      'completed': []
    };
    
    return transitions[currentStatus]?.includes(newStatus) || false;
  }
}

module.exports = Project;
