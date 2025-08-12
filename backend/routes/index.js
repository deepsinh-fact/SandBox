import authRoutes from './auth.js';
import clientRoutes from './client.js';
import clientMasterRoutes from './clientMaster.js';

const setupRoutes = (app) => {
    // Mount all API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/client', clientRoutes);
    app.use('/api/clientmaster', clientMasterRoutes);
};

export default setupRoutes;