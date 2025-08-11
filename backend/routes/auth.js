import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock users for testing (in production, this would come from database)
const mockUsers = [
    {
        id: 1,
        email: 'test@gmail.com',
        password: 'password123',
        name: 'Test User',
        credit: 1000,
        packages: {
            GST: true,
            CIN: true,
            PAN: true,
            MSME: true,
            DIN: true,
            IEC: true,
            Mobile360: true,
            OSINT: true,
            MAD: true,
            DARPAN: true
        }
    },
    {
        id: 2,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        credit: 5000,
        packages: {
            GST: true,
            CIN: true,
            PAN: true,
            MSME: true,
            DIN: true,
            IEC: true,
            Mobile360: true,
            OSINT: true,
            MAD: true,
            DARPAN: true
        }
    }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working' });
});

// Login route
router.post('/login', (req, res) => {
    try {
        const { email, password, devicePlateform } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Email and password are required'
            });
        }

        // Find user in mock data
        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({
                success: false,
                errorMessage: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return success response
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                credit: user.credit,
                packages: user.packages
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            errorMessage: 'Internal server error'
        });
    }
});

// Register route
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint - Not implemented yet' });
});

export default router;