const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Import database connection (using SQLite)
const { connectDB } = require('./config/db.js');


const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/client');

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


app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);

// Initialize database and start server
const startServer = async () => {
    try {
        // Connect to SQL Server
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Node.js Authentication API listening on http://localhost:${PORT}`);
            console.log('Available endpoints:');
            console.log('\nTest credentials:');
            console.log('  Email: test@gmail.com, Password: password123');
            console.log('  Email: admin@example.com, Password: admin123');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

// Start the server
startServer();
