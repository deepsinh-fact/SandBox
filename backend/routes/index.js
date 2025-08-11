import authRoutes from './auth.js';
import clientRoutes from './client.js';
import clientMasterRoutes from '../controllers/clientMaster.js';
import { getAllClient, getClientById } from '../controllers/clientMaster.js';

const setupRoutes = (app) => {
    // Mount all API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/client', clientRoutes);
    app.use('/api/clientmaster', clientMasterRoutes);

    // Add specific route handlers
    app.get('/api/clientmaster/getAllClient', getAllClient);
    app.get('/api/clientmaster/getClientByID/:id', getClientById);
};

export default setupRoutes;