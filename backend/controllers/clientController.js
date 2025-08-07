const clientsData = require('../data.json');

const clientController = {
    // Get all clients
    getAllClients: (req, res) => {
        try {
            // Return data in the exact format your frontend expects
            res.json({
                success: true,
                data: clientsData,
                message: 'Clients retrieved successfully'
            });
        } catch (err) {
            console.error('Error retrieving clients:', err);
            res.status(500).json({
                success: false,
                message: 'Error retrieving client data',
                error: err.message
            });
        }
    },

    getClientById: (req, res) => {
        try {
            const { id } = req.params;
            const client = clientsData.find(c => c.ClientId == id);

            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Client not found'
                });
            }

            res.json({
                success: true,
                data: client,
                message: 'Client retrieved successfully'
            });
        } catch (err) {
            console.error('Error retrieving client:', err);
            res.status(500).json({
                success: false,
                message: 'Error retrieving client data',
                error: err.message
            });
        }
    },

    // Add a new client
    createClient: (req, res) => {
        const { name, email, phone, address } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Client name is required'
            });
        }

        // For now, just return success (since we're using static data)
        const newId = Math.max(...clientsData.map(c => c.ClientId)) + 1;

        res.status(201).json({
            success: true,
            data: { id: newId, name, email, phone, address },
            message: 'Client created successfully'
        });
    },

    // Update a client
    updateClient: (req, res) => {
        const { id } = req.params;
        const client = clientsData.find(c => c.ClientId == id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.json({
            success: true,
            data: client,
            message: 'Client updated successfully'
        });
    },

    // Delete a client
    deleteClient: (req, res) => {
        const { id } = req.params;
        const client = clientsData.find(c => c.ClientId == id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.json({
            success: true,
            message: 'Client deleted successfully'
        });
    }
};

module.exports = clientController;