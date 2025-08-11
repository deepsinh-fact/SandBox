import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import setupRoutes from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'Node.js Authentication API is running',
        status: 'OK',
        version: '1.0.0'
    });
});

// Setup all API routes
setupRoutes(app);

// Initialize database and start server
const startServer = async () => {
    try {
        // Skip database connection check for now - using direct SQL Server connection in routes
        console.log('Starting server with SQL Server connection...');

        app.listen(PORT, () => {
            console.log(`Node.js Authentication API listening on http://localhost:${PORT}`);

            console.log('\nTest credentials:');
            console.log('  Email: test@gmail.com, Password: password123');
            // console.log('  Email: admin@example.com, Password: admin123');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

// Start the server
startServer();
