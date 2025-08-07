// Import the mysql package
const mysql = require('mysql');

// Configuration for the database connection
const config = {
    host: "localhost",
    user: "root",
    password: "your_mysql_password_here", // Add your MySQL password here
    database: "portal_db"
};

// Async function to connect and query the database
async function connectAndQuery() {
    const connection = mysql.createConnection(config);

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('MySQL connection error:', err);
                reject(err);
                return;
            }

            console.log('** Connected to MySQL successfully!');

            // Execute a query to test connection
            connection.query('SELECT 1 as test', (error, results) => {
                if (error) {
                    console.error('Query error:', error);
                    connection.end();
                    reject(error);
                    return;
                }

                console.log('Query Results:');
                console.table(results);

                connection.end();
                console.log('Connection closed.');
                resolve(results);
            });
        });
    });
}

// Run the function only if this file is executed directly
if (require.main === module) {
    connectAndQuery().catch(console.error);
}

module.exports = { connectAndQuery, config };