import express from 'express';
import {
    getAllClient,
    getClientById,
    updateClient,
    deleteClient,
    addClient
} from '../controllers/clientMaster.js';

const router = express.Router();

router.get('/getAllClient', getAllClient);

router.get('/getClientByID/:id', getClientById);

router.put('/updateClient/:id', updateClient);

router.delete('/deleteClient/:id', deleteClient);

router.post('/addClient', addClient);

export default router;