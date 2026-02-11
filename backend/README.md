# Project Tracking System - Backend

A RESTful API for managing projects with SQLite database.

## Features

- CRUD operations for projects
- Status transition validation
- Soft delete functionality
- Search and filtering
- Rate limiting and security headers

## Installation

```bash
npm install
```

## Database Setup

```bash
npm run init-db
```

## Running the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects` | List all projects with filters |
| GET | `/api/projects/:id` | Get project by ID |
| PATCH | `/api/projects/:id/status` | Update project status |
| DELETE | `/api/projects/:id` | Soft delete project |

### Query Parameters for GET /api/projects

- `status`: Filter by status (active, on_hold, completed)
- `search`: Search in name or clientName fields
- `sortBy`: Sort by createdAt or startDate (default: createdAt)
- `sortOrder`: ASC or DESC (default: DESC)

### Example Requests

Create a project:
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Redesign",
    "clientName": "ABC Corp",
    "status": "active",
    "startDate": "2024-01-15",
    "endDate": "2024-03-15"
  }'
```

List projects with filters:
```bash
curl "http://localhost:3001/api/projects?status=active&search=website&sortBy=startDate&sortOrder=ASC"
```

Update project status:
```bash
curl -X PATCH http://localhost:3001/api/projects/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## Project Schema

```json
{
  "id": "integer",
  "name": "string (required)",
  "clientName": "string (required)",
  "status": "enum[active, on_hold, completed] (required)",
  "startDate": "string (required, ISO date)",
  "endDate": "string (optional, ISO date)",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

## Status Transitions

- `active` → `on_hold` | `completed`
- `on_hold` → `active` | `completed`
- `completed` → no transitions allowed

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Health Check

```bash
curl http://localhost:3001/api/health
```
