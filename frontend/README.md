# Project Tracking System - Frontend

A modern React frontend for the Project Tracking System with Tailwind CSS.

## Features

- Dashboard with project listing
- Advanced filtering and search
- Project detail views
- Status management
- Create new projects
- Delete projects
- Responsive design
- Loading and error states

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Components Structure

```
src/
├── components/
│   ├── CreateProjectForm.jsx    # Modal for creating new projects
│   ├── ErrorMessage.jsx         # Reusable error display
│   ├── LoadingSpinner.jsx       # Loading indicator
│   ├── ProjectCard.jsx          # Project card for grid view
│   ├── ProjectDetail.jsx        # Detailed project view
│   └── ProjectFilters.jsx       # Filter controls
├── hooks/
│   ├── useProject.js            # Hook for single project operations
│   └── useProjects.js           # Hook for project list operations
├── pages/
│   └── Dashboard.jsx            # Main dashboard page
├── services/
│   └── api.js                   # API service layer
└── App.jsx                      # Main app component
```

## State Management

The application uses React hooks for state management:

- **useProjects**: Manages the project list, filters, and CRUD operations
- **useProject**: Manages individual project operations

## API Integration

The frontend communicates with the backend API through the `apiService`:

- Automatic error handling
- Request/response interceptors
- Consistent data formatting

## Styling

- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- Custom CSS classes defined in `index.css`

## Features

### Dashboard
- Grid view of all projects
- Real-time filtering by status and search terms
- Sort by creation date or start date
- Create new projects
- Navigate to project details

### Project Cards
- Display key project information
- Quick status updates
- Delete functionality
- Click to view details

### Project Detail View
- Complete project information
- Status management with validation
- Timeline visualization
- System information

### Filtering
- Status filter (Active, On Hold, Completed)
- Search by project name or client name
- Sort options
- Clear filters functionality

## Error Handling

- User-friendly error messages
- Network error handling
- Form validation with inline errors
- Loading states for all async operations

## Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly controls
- Optimized for all screen sizes
