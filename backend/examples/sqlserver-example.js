const { connectDB, getPool, sql } = require('../config/db');

// Example function to test SQL Server connection
async function testConnection() {
    try {
        // Connect to database
        await connectDB();
        
        // Get the connection pool
        const pool = getPool();
        
        // Example 1: Simple query
        const result = await pool.request().query('SELECT @@VERSION as version');
        console.log('SQL Server Version:', result.recordset[0].version);
        
        // Example 2: Create a table
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
            CREATE TABLE users (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name NVARCHAR(100) NOT NULL,
                email NVARCHAR(100) UNIQUE NOT NULL,
                created_at DATETIME DEFAULT GETDATE()
            )
        `);
        console.log('Users table created or already exists');
        
        // Example 3: Insert data with parameters (prevents SQL injection)
        const insertResult = await pool.request()
            .input('name', sql.NVarChar, 'John Doe')
            .input('email', sql.NVarChar, 'john.doe@example.com')
            .query('INSERT INTO users (name, email) VALUES (@name, @email)');
        
        console.log('User inserted, rows affected:', insertResult.rowsAffected[0]);
        
        // Example 4: Select data
        const users = await pool.request().query('SELECT * FROM users');
        console.log('Users:', users.recordset);
        
    } catch (error) {
        console.error('Database operation failed:', error);
    }
}

// Example function for your client controller
async function getClients() {
    try {
        const pool = getPool();
        const result = await pool.request().query('SELECT * FROM clients');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
}

// Example function to create a client
async function createClient(clientData) {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('name', sql.NVarChar, clientData.name)
            .input('email', sql.NVarChar, clientData.email)
            .input('phone', sql.NVarChar, clientData.phone)
            .query(`
                INSERT INTO clients (name, email, phone) 
                VALUES (@name, @email, @phone);
                SELECT SCOPE_IDENTITY() as id;
            `);
        
        return { id: result.recordset[0].id, ...clientData };
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

module.exports = {
    testConnection,
    getClients,
    createClient
};

// Run test if this file is executed directly
if (require.main === module) {
    testConnection();
}