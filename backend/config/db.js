const mysql = require('mysql');

// Create connection pool for better performance
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root", 
  password: "", 
  database: "FACT", 
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Function to connect to database
const connectDB = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Database connection failed:', err.message);
        // Don't reject - allow server to start without DB for now
        console.log('Server starting without database connection...');
        resolve();
        return;
      }
      
      console.log('Connected to MySQL database successfully!');
      connection.release(); // Release connection back to pool
      resolve();
    });
  });
};

module.exports = { connectDB, pool };