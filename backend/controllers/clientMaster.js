import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sql = require('msnodesqlv8');
import 'dotenv/config';


// Connection string for msnodesqlv8 with Windows Authentication
const connectionString = `server=${process.env.DB_SERVER || "FACT-LAP-07"};Database=${process.env.DB_NAME || "Fact"};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};`;

// Helper function to execute SQL queries
const executeQuery = (queryString, params = []) => {
    return new Promise((resolve, reject) => {
        // console.log('Executing query:', queryString);
        // console.log('With params:', params);

        if (params.length === 0) {
            // If no parameters, use simple query
            sql.query(connectionString, queryString, (err, rows) => {
                if (err) {
                    console.error('SQL Error:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } else {
            // Use parameterized query
            sql.query(connectionString, queryString, params, (err, rows) => {
                if (err) {
                    console.error('SQL Error:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    });
};



// Function to generate auto Client ID
const generateClientId = async () => {
    try {
        // Get the maximum Client_ClientId and increment it
        const maxIdQuery = `
            SELECT TOP 1 CAST(Client_ClientId AS INT) as maxId 
            FROM ClientMaster 
            WHERE ISNUMERIC(Client_ClientId) = 1 
            ORDER BY CAST(Client_ClientId AS INT) DESC
        `;

        const result = await executeQuery(maxIdQuery, []);

        if (result.length > 0 && result[0].maxId) {
            return (parseInt(result[0].maxId) + 1).toString();
        } else {
            return '1';
        }
    } catch (error) {
        console.error('Error generating Client ID:', error);
        return Date.now().toString();
    }
};

// GET /api/clientmaster/getAllClient - Get all clients
export const getAllClient = async (req, res) => {
    try {
        // console.log('Fetching all clients from ClientMaster table');

        const selectQuery = `
            SELECT * FROM ClientMaster 
        `;

        const clients = await executeQuery(selectQuery);
        // console.log('Fetched clients from database:', clients);

        res.json({
            success: true,
            message: 'Clients retrieved successfully',
            data: clients
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// PUT /api/clientmaster/updateClient/:id - Update existing client (exported function)
export const updateClient = async (req, res) => {
    try {

        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid client ID'
            });
        }

        const {
            ClientName,
            ClientContactNumber,
            ClientAddress,
            ClientPAN,
            ClientGST,
            ClientCIN,
            Client_SecreteKey
        } = req.body;

        console.log('Updating client:', clientId, req.body);

  
        // Check if client exists
        const checkQuery = `SELECT * FROM ClientMaster WHERE AutoId = ${clientId}`;
        const existingClient = await executeQuery(checkQuery);

        if (!existingClient || existingClient.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        // Build update query dynamically based on provided fields
        let updateFields = [];
        let updateValues = [];

        if (ClientName !== undefined) {
            updateFields.push('ClientName = ?');
            updateValues.push(ClientName);
        }
        if (ClientContactNumber !== undefined) {
            updateFields.push('ClientContactNumber = ?');
            updateValues.push(ClientContactNumber);
        }
        if (ClientAddress !== undefined) {
            updateFields.push('ClientAddress = ?');
            updateValues.push(ClientAddress);
        }
        if (ClientPAN !== undefined) {
            updateFields.push('ClientPAN = ?');
            updateValues.push(ClientPAN);
        }
        if (ClientGST !== undefined) {
            updateFields.push('ClientGST = ?');
            updateValues.push(ClientGST);
        }
        if (ClientCIN !== undefined) {
            updateFields.push('ClientCIN = ?');
            updateValues.push(ClientCIN);
        }
        if (Client_SecreteKey !== undefined) {
            updateFields.push('Client_SecreteKey = ?');
            updateValues.push(Client_SecreteKey);
        }

        // Only add fields if we have something to update
        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        const updateQuery = `UPDATE ClientMaster SET ${updateFields.join(', ')} WHERE AutoId = ${clientId}`;

        console.log('Update query:', updateQuery);
        console.log('Update values:', updateValues);

        await executeQuery(updateQuery, updateValues);

        // Fetch the updated client
        const selectQuery = `SELECT * FROM ClientMaster WHERE AutoId = ${clientId}`;
        const updatedClient = await executeQuery(selectQuery);

        console.log('Updated client:', updatedClient[0]);

        res.json({
            success: true,
            message: 'Client updated successfully',
            data: updatedClient[0]
        });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// GET /api/clientmaster/getClientByID/:id - Get client by ID
export const getClientById = async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid client ID'
            });
        }


        const selectQuery = `
            SELECT * FROM ClientMaster 
            WHERE AutoId = ?
        `;

        const clients = await executeQuery(selectQuery, [clientId]);

        if (!clients || clients.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client does not exists'
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
};

// DELETE /api/clientmaster/deleteClient/:id - Delete client by ID
export const deleteClient = async (req, res) => {
    console.log("Hello from delete")
    try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid client ID'
            });
        }

        console.log('Deleting client with ID:', clientId);

        // Check if client exists
        const checkQuery = `SELECT * FROM ClientMaster WHERE AutoId = ?`;
        const existingClient = await executeQuery(checkQuery, [clientId]);

        if (!existingClient || existingClient.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        // Delete the client
        const deleteQuery = `DELETE FROM ClientMaster WHERE AutoId = ?`;
        await executeQuery(deleteQuery, [clientId]);

        console.log('Client deleted successfully:', existingClient[0]);

        res.json({
            success: true,
            message: 'Client deleted successfully',
            data: existingClient[0]
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// POST /api/clientmaster/addClient - Create new client
export const addClient = async (req, res) => {
    try {
        const {
            ClientName,
            ClientContactNumber,
            ClientAddress,
            ClientPAN,
            ClientGST,
            ClientCIN,
            Client_SecreteKey,
            CreatedBy
        } = req.body;

        console.log('Creating new client:', req.body);

        // Basic validation - only ClientName is required now
        if (!ClientName) {
            return res.status(400).json({
                success: false,
                message: 'ClientName is required'
            });
        }

        // Auto-generate Client_ClientId
        const autoGeneratedClientId = await generateClientId();
        console.log('Auto-generated Client ID:', autoGeneratedClientId);

        // Get current timestamp for CreatedDate
        const currentDateTime = new Date().toISOString();
        const currentUser = CreatedBy || 'System';

        console.log('Current User:', currentUser);
        console.log('Current DateTime:', currentDateTime);

        // Insert new client with auto-generated Client_ClientId using parameterized query
        const insertQuery = `
            INSERT INTO ClientMaster (
                AutoId,
                ClientName,
                ClientContactNumber,
                ClientAddress,
                ClientPAN,
                ClientGST,
                ClientCIN,
                Client_ClientId,
                Client_SecreteKey,
                CreatedBy,
                CreatedDate
            ) VALUES (
                (SELECT ISNULL(MAX(AutoId), 0) + 1 FROM ClientMaster),
                ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE()
            )
        `;

        const insertParams = [
            ClientName,
            ClientContactNumber || null,
            ClientAddress || null,
            ClientPAN || null,
            ClientGST || null,
            ClientCIN || null,
            autoGeneratedClientId,
            Client_SecreteKey || null,
            currentUser
        ];

      

        await executeQuery(insertQuery, insertParams);

        // Fetch the newly created client
        const selectQuery = `SELECT * FROM ClientMaster WHERE Client_ClientId = ?`;

        const newClient = await executeQuery(selectQuery, [autoGeneratedClientId]);
        // console.log('Newly created client:', newClient[0]);

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            data: {
                ...newClient[0],
                Client_ClientId: autoGeneratedClientId
            }
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};