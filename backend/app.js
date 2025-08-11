import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sql = require('msnodesqlv8');
const express = require('express');
const cors = require('cors');
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import clientRoutes from './routes/client.js';
app.use('/api/client', clientRoutes);

// Connection string for msnodesqlv8 with Windows Authentication
const connectionString = `server=${process.env.DB_SERVER || "FACT-LAP-07"};Database=${process.env.DB_NAME || "Fact"};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};`;

async function connectAndQuery() {
    try {
        console.log('Attempting to connect to SQL Server...');
        console.log('Connection string:', connectionString.replace(/;/g, ';\n  '));

        // Use callback-based approach with Promise wrapper
        const query = (queryString) => {
            return new Promise((resolve, reject) => {
                sql.query(connectionString, queryString, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        };

        console.log('Connected to SQL Server successfully! CLientMaster');

        const result = await query("SELECT * from ClientMaster");

        console.log('Query Results:');
        console.log(result);

        console.log('Query completed successfully.');
    } catch (err) {
        console.error('SQL Server error:', err);
        console.error('Error details:', {
            message: err.message,
            code: err.code,
            state: err.state,
            severity: err.severity
        });
    }
}

connectAndQuery();

