// Import the mssql package for SQL Server
const sql = require('mssql');

// Load environment variables
require('dotenv').config();

// Configuration for SQL Server with Windows Authentication
const config = {
    server: process.env.DB_SERVER || "FACT-LAP-07", // Your SQL Server instance
    database: process.env.DB_NAME || "FACT",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true, // Use Windows Authentication
        enableArithAbort: true,
        encrypt: false, // Set to true if using SSL
        trustServerCertificate: true,
        instanceName: process.env.DB_INSTANCE || undefined
    }
};

// Async function to connect and query SQL Server
async function connectAndQuery() {
    try {
        // Create connection pool
        const pool = await sql.connect(config);
        console.log('** Connected to SQL Server successfully!');

        // Execute a test query
        const result = await pool.request().query('SELECT 1 as test, GETDATE() as current_time');
        
        console.log('Query Results:');
        console.table(result.recordset);

        // Close the connection
        await pool.close();
        console.log('Connection closed.');
        
        return result.recordset;
    } catch (err) {
        console.error('SQL Server connection error:', err);
        throw err;
    }
}

// Run the function only if this file is executed directly
if (require.main === module) {
    connectAndQuery().catch(console.error);
}

module.exports = { connectAndQuery, config };