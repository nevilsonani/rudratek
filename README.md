# Project Tracking System

A full-stack project management application with Node.js backend and React frontend, featuring modern UI design, comprehensive CRUD operations, and beautiful user experience.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nevilsonani/rudratek.git
   cd rudratek
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run init-db
   npm run dev
   ```
   The backend will start on `http://localhost:3001`

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

4. **Access the Application**
   - Open `http://localhost:3000` in your browser
   - The API is available at `http://localhost:3001`

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication
Currently no authentication is implemented (development mode).

### Endpoints

#### 📋 Projects

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/projects` | Create a new project | Project object | Created project |
| `GET` | `/projects` | List all projects with filters | Query params | Array of projects |
| `GET` | `/projects/:id` | Get project by ID | - | Project object |
| `PATCH` | `/projects/:id/status` | Update project status | `{status}` | Updated project |
| `DELETE` | `/projects/:id` | Soft delete project | - | 204 No Content |

### Query Parameters (GET /projects)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by project status | `?status=active` |
| `search` | string | Search in name or clientName | `?search=website` |
| `sortBy` | string | Sort field (createdAt, startDate) | `?sortBy=createdAt` |
| `sortOrder` | string | Sort order (ASC, DESC) | `?sortOrder=DESC` |

### Project Schema

```json
{
  "id": "integer",
  "name": "string (required, max 255)",
  "clientName": "string (required, max 255)",
  "status": "enum[active, on_hold, completed] (required)",
  "startDate": "string (required, ISO date format)",
  "endDate": "string (optional, ISO date format)",
  "createdAt": "string (ISO timestamp, auto-generated)",
  "updatedAt": "string (ISO timestamp, auto-updated)"
}
```

### Status Transitions

Valid status transitions enforced by the API:

- `active` → `on_hold` | `completed`
- `on_hold` → `active` | `completed`
- `completed` → **No transitions allowed**

### Example Requests

#### Create Project
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

#### List Projects with Filters
```bash
curl "http://localhost:3001/api/projects?status=active&search=website&sortBy=startDate&sortOrder=ASC"
```

#### Update Project Status
```bash
curl -X PATCH http://localhost:3001/api/projects/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

#### Delete Project
```bash
curl -X DELETE http://localhost:3001/api/projects/1
```

### Error Responses

All errors return JSON with an `error` field:

```json
{
  "error": "Descriptive error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content (successful delete)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🏗️ Architecture & Design Decisions

### Backend Architecture

**Technology Stack:**
- **Node.js + Express** - Web framework
- **SQLite** - Database (file-based, simple setup)
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - DDoS protection

**Design Patterns:**
- **MVC Pattern** - Clear separation of concerns
- **Repository Pattern** - Database abstraction
- **Middleware Chain** - Request processing pipeline
- **Soft Delete** - Data retention capability

### Frontend Architecture

**Technology Stack:**
- **React 18** - UI framework with hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing

**Design Patterns:**
- **Custom Hooks** - State management and API calls
- **Functional Components** - Modern React approach
- **Component Composition** - Reusable UI elements
- **Optimistic Updates** - Better user experience

## 🤔 Assumptions & Trade-offs

### Backend Decisions

#### ✅ SQLite over PostgreSQL/MongoDB
**Assumption:** This is a demonstration/small-scale application
**Trade-off:** 
- ✅ **Pros:** Zero setup, file-based, portable
- ❌ **Cons:** Limited scalability, single-writer concurrency

#### ✅ Soft Delete Implementation
**Assumption:** Data retention is important for audit purposes
**Trade-off:**
- ✅ **Pros:** Recoverable data, audit trail
- ❌ **Cons:** Storage overhead, query complexity

#### ✅ Express over Fastify
**Assumption:** Developer familiarity and ecosystem maturity
**Trade-off:**
- ✅ **Pros:** Larger ecosystem, more examples
- ❌ **Cons:** Slightly slower performance

### Frontend Decisions

#### ✅ Vite over Create React App
**Assumption:** Development experience and build speed are priorities
**Trade-off:**
- ✅ **Pros:** Faster HMR, modern tooling, smaller bundles
- ❌ **Cons:** Newer, less established

#### ✅ Custom Hooks over Redux/Context
**Assumption:** Application complexity doesn't require global state management
**Trade-off:**
- ✅ **Pros:** Simpler, less boilerplate, component-scoped
- ❌ **Cons:** Limited to component tree, prop drilling for deep nesting

#### ✅ Tailwind CSS over CSS Modules
**Assumption:** Rapid development and consistent design system are important
**Trade-off:**
- ✅ **Pros:** Fast prototyping, consistent design, responsive utilities
- ❌ **Cons:** Larger bundle size, learning curve

### Security Considerations

#### Current Implementation:
- ✅ CORS configuration
- ✅ Rate limiting (100 requests/15min)
- ✅ Security headers (Helmet)
- ✅ Input validation and sanitization
- ✅ SQL injection prevention

#### Limitations:
- ❌ No authentication/authorization
- ❌ No request signing
- ❌ No input sanitization for XSS (handled by React)
- ❌ No CSRF protection

### Performance Considerations

#### Optimizations:
- ✅ Database indexes on frequently queried fields
- ✅ Component memoization where appropriate
- ✅ Lazy loading for large datasets
- ✅ Efficient state management with custom hooks

#### Potential Bottlenecks:
- ❌ SQLite file I/O for concurrent requests
- ❌ No caching layer
- ❌ No CDN for static assets

## 📁 Project Structure

```
rudratek/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── projectController.js    # Request handlers
│   │   ├── database/
│   │   │   ├── connection.js          # Database connection
│   │   │   └── init.js               # Database initialization
│   │   ├── models/
│   │   │   └── Project.js            # Data model and business logic
│   │   ├── routes/
│   │   │   └── projects.js           # Route definitions
│   │   └── server.js                 # Express server setup
│   ├── data/                        # SQLite database files (auto-created)
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProjectForm.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── ProjectFilters.jsx
│   │   ├── hooks/
│   │   │   ├── useProject.js         # Single project state
│   │   │   └── useProjects.js        # Project list state
│   │   ├── pages/
│   │   │   └── Dashboard.jsx         # Main application page
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Application entry
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🧪 Development

### Running Tests
```bash
# Backend tests (when implemented)
cd backend && npm test

# Frontend tests (when implemented)
cd frontend && npm test
```

### Building for Production
```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run build
```


## 🚀 Future Enhancements

### High Priority
- [ ] Authentication & Authorization (JWT)
- [ ] Real-time updates (WebSockets)
- [ ] File attachments for projects
- [ ] Advanced search and filtering

### Medium Priority
- [ ] Team collaboration features
- [ ] Project templates
- [ ] Calendar integration
- [ ] Export functionality (PDF, Excel)


### Code Style Guidelines
- Use functional components with hooks
- Follow the existing naming conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes on ports 3000 and 3001
npx kill-port 3000
npx kill-port 3001
```

**Database not found:**
```bash
cd backend && npm run init-db
```

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (requires v16+)


