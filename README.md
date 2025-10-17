# AI Home Redesign

An AI-powered platform for visualizing home redesigns and renovations. Upload photos of your space and generate realistic previews of extensions, new materials, and furniture layouts.

## Features

- **Photo Upload**: Upload multiple images of house interiors or exteriors
- **AI Generation**: Generate realistic previews of redesigns and extensions
- **Interactive Editing**: Adjust dimensions, colors, and materials in real-time
- **Material Integration**: Browse real-world materials with pricing
- **Project Management**: Save and share multiple design variations
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Styled Components** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **React Hook Form** for form handling
- **React Dropzone** for file uploads

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose
- **Multer** for file uploads
- **Helmet** for security
- **CORS** for cross-origin requests
- **Morgan** for logging

## Project Structure

```
ai-home-redesign/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Custom middleware
│   │   ├── controllers/    # Route controllers
│   │   └── utils/          # Utility functions
│   ├── uploads/            # File upload directory
│   └── package.json
└── package.json            # Root package.json for workspace management
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-home-redesign
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Backend** (copy `backend/env.example` to `backend/.env`):
   ```env
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/ai-home-redesign
   AI_API_KEY=your_ai_api_key_here
   AI_SERVICE_URL=https://api.example.com/ai
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   JWT_SECRET=your_jwt_secret_here
   ```

   **Frontend** (copy `frontend/env.example` to `frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5001/api
   VITE_APP_NAME=AI Home Redesign
   VITE_APP_VERSION=1.0.0
   VITE_MAX_FILE_SIZE=10485760
   VITE_ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5001) servers concurrently.

### Alternative: Start servers individually

- **Frontend only**: `npm run start:frontend`
- **Backend only**: `npm run start:backend`

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run start` - Start both frontend and backend in production mode
- `npm run build` - Build both frontend and backend for production
- `npm test` - Run tests for both frontend and backend
- `npm run install:all` - Install dependencies for all workspaces

### API Endpoints

#### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

#### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### AI
- `POST /api/ai/generate` - Generate AI variations
- `GET /api/ai/styles` - Get available styles
- `GET /api/ai/materials` - Get available materials

#### Health
- `GET /api/health` - Health check endpoint

## AI Integration

The application is designed to integrate with AI image generation services. Currently, the backend includes placeholder endpoints for AI functionality. To integrate with a real AI service:

1. Update the `AI_API_KEY` and `AI_SERVICE_URL` in your backend `.env` file
2. Implement the actual AI service calls in `backend/src/routes/ai.js`
3. Update the frontend to handle real AI responses

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build --workspace=frontend`
2. Deploy the `frontend/dist` directory
3. Set environment variables in your deployment platform

### Backend (Railway/Heroku/DigitalOcean)
1. Build the backend: `npm run build --workspace=backend`
2. Deploy with proper environment variables
3. Ensure MongoDB is accessible from your deployment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@aihomeredesign.com or create an issue in the repository.
