import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /api/client/json - Get all clients from data.json file
router.get('/json', async (req, res) => {
    try {
      
        // Read data from data.json file
        const dataPath = path.join(__dirname, '..', 'data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const clients = JSON.parse(jsonData);
        
        console.log('Raw data from data.json:', clients);

        res.json({
            success: true,
            message: 'Clients retrieved successfully from data.json',
            data: clients
        });
    } catch (error) {
        console.error('Error fetching clients from data.json:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET /api/client - Get all clients from data.json file
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all clients from data.json file');
        
        // Read data from data.json file
        const dataPath = path.join(__dirname, '..', 'data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const clients = JSON.parse(jsonData);
        
        // Transform data to match expected format
        const transformedClients = clients.map((client, index) => ({
            AutoId: index + 1,
            Client_ClientId: client.ClientId,
            ClientName: client.ClientName,
            ClientContactNumber: client.MobileNumber,
            ClientAddress: client.Address,
            ClientPAN: client.PAN,
            ClientGST: client.GST,
            ClientCIN: null,
            Client_SecreteKey: client.SecretKey,
            CreatedBy: 'System',
            CreatedDate: new Date().toISOString().split('T')[0]
        }));
        
        console.log('Fetched clients from data.json:', transformedClients);

        res.json({
            success: true,
            message: 'Clients retrieved successfully from data.json',
            data: transformedClients
        });
    } catch (error) {
        console.error('Error fetching clients from data.json:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});


// GET /api/client/:id - Get client by ID from database
router.get('/:id', async (req, res) => {
    try {
        console.log('=== ID ROUTE HIT ===');
        console.log('Request URL:', req.url);
        console.log('Request path:', req.path);
        console.log('Request params:', req.params);
        
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        const sql = require('msnodesqlv8');

        // Connection string for msnodesqlv8 with Windows Authentication
        const connectionString = `server=${process.env.DB_SERVER || "FACT-LAP-07"};Database=${process.env.DB_NAME || "Fact"};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};`;

        // Helper function to execute SQL queries
        const executeQuery = (queryString, params = []) => {
            return new Promise((resolve, reject) => {
                sql.query(connectionString, queryString, params, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        };

        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid client ID'
            });
        }

        console.log('Fetching client by ID:', clientId);

        const selectQuery = `
            SELECT * FROM ClientMaster 
            WHERE AutoId = ?
        `;

        const clients = await executeQuery(selectQuery, [clientId]);

        if (!clients || clients.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        console.log('Fetched client from database:', clients[0]);

        res.json({
            success: true,
            message: 'Client retrieved successfully',
            data: clients[0]
        });
    } catch (error) {
        console.error('Error fetching client by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST /api/client - Create new client
router.post('/', async (req, res) => {
    try {
        console.log('Received POST request with body:', req.body);
        
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is missing'
            });
        }

        const {
            Client_ClientId,
            ClientName,
            ClientContactNumber,
            ClientAddress,
            ClientPAN,
            ClientGST,
            ClientCIN,
            Client_SecreteKey,
            CreatedBy
        } = req.body;

        // Basic validation
        if (!ClientName || !Client_ClientId) {
            return res.status(400).json({
                success: false,
                message: 'ClientName and Client_ClientId are required'
            });
        }

        // Read existing data
        const dataPath = path.join(__dirname, '..', 'data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const clients = JSON.parse(jsonData);

        // Create new client object in the format matching data.json
        const newClient = {
            ClientId: Client_ClientId,
            ClientName: ClientName,
            MobileNumber: ClientContactNumber,
            Address: ClientAddress,
            PAN: ClientPAN,
            GST: ClientGST,
            CIN: ClientCIN,
            SecretKey: Client_SecreteKey
        };

        // Add to existing clients
        clients.push(newClient);

        // Write back to file
        fs.writeFileSync(dataPath, JSON.stringify(clients, null, 2));

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            data: newClient
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

export default router;