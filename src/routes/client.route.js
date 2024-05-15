import { Router } from 'express';
import {
    listAllClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient,
    searchClients,
} from '../controllers/client.controller.js';

const router = Router();


router.get('/clients', listAllClients);
router.post('/clients', createClient);
router.get('/clients/:id', getClientById);
router.post('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);
router.get('/clients/search', searchClients);

export default router;