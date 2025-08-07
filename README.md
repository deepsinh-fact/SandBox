# React + Node.js + .NET API Integration

This project demonstrates how to integrate a React frontend with a Node.js backend that forwards authentication requests to a .NET API.

## Architecture

```
React Frontend (port 5173) → Node.js Backend (port 3000) → .NET API (port 5200)
```

## Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Testing

### Test Backend Only
Run the integration test script:
```bash
cd backend
node test-integration.js
```

### Test with Mock Mode
If your .NET API is not running, you can test with mock data:
```bash
cd backend
MOCK_MODE=true node index.js
```

Then use these test credentials in your React app:
- Email: `test@gmail.com`
- Password: `password123`

### Test Full Integration
1. Make sure your .NET API is running on `http://localhost:5200`
2. Start the Node.js backend: `npm start` (in backend directory)
3. Start the React frontend: `npm run dev` (in frontend directory)
4. Navigate to `http://localhost:5173` and test the login

## Configuration

### Backend Configuration
- **Port**: 3000 (configurable in `backend/index.js`)
- **CORS**: Configured for React frontend on port 5173
- **.NET API URL**: `http://localhost:5200/api/auth/login`

### Frontend Configuration
- **API Base URL**: `http://localhost:3000` (configured in `frontend/src/Config/index.js`)

## API Endpoints

### Node.js Backend
- `GET /` - Health check
- `POST /api/login` - Login endpoint that forwards to .NET API

### Expected Request Format
```json
{
  "email": "user@example.com",
  "password": "password123",
  "devicePlateform": "web"
}
```

### Expected Response Format
```json
{
  "success": true,
  "token": "jwt-token-here",
  "data": {
    "email": "user@example.com",
    "credit": 100,
    "packages": {}
  },
  "message": "Successfully logged in via .NET API!"
}
```

## Troubleshooting

1. **CORS Issues**: Make sure the backend CORS is configured for your frontend URL
2. **.NET API Connection**: Check if your .NET API is running on the correct port
3. **Port Conflicts**: Ensure ports 3000 (backend) and 5173 (frontend) are available
4. **Mock Mode**: Use `MOCK_MODE=true` to test without the .NET API