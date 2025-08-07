const fs = require('fs');
const path = require('path');

// Path to users data file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// Helper function to find user by email
const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Generate simple JWT-like token (for demo purposes)
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    timestamp: Date.now()
  };
  // In production, use proper JWT library
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        errorMessage: "Email and password are required"
      });
    }

    console.log(`Login attempt for email: ${email}`);

    // Find user by email
    const user = findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        errorMessage: "Invalid email or password"
      });
    }

    // Check password (in production, use bcrypt for hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        errorMessage: "Invalid email or password"
      });
    }

    // Generate token
    const token = generateToken(user);

    // Successful login response
    const response = {
      success: true,
      token: token,
      data: {
        id: user.id,
        email: user.email,
        credit: user.credit,
        packages: user.packages
      },
      message: "Login successful"
    };

    console.log(`Login successful for user: ${email}`);
    res.status(200).json(response);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      errorMessage: "Internal server error"
    });
  }
};

module.exports = {
  login
};