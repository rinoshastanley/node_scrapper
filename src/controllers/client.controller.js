import {
    getAllClients,
    createClient as createClientService,
    getClientById as getClientByIdService,
    updateClient as updateClientService,
    deleteClient as deleteClientService,
    searchClients as searchClientsService,
} from '../services/client.services.js';

export const listAllClients = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.json(clients);
    } catch (error) {
        console.error('Error listing clients:', error);
        res.status(500).json({ error: 'Failed to list clients' });
    }
};

export const createClient = async (req, res) => {
    try {
        const { name, CIN, PIN, status, address } = req.body;

        const errors = [];
        if (CIN && CIN.length !== 21) {
            errors.push('CIN must be exactly 21 characters');
        }
        if (PIN && PIN.length !== 6) {
            errors.push('PIN must be exactly 6 digits');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const client = await createClientService({ name, CIN, PIN, status, address });
        res.json(client);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'Failed to create client' });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await getClientByIdService(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Failed to fetch client' });
    }
};

export const updateClient = async (req, res) => {
    try {
        const { name, CIN, PIN, status, address } = req.body;

        const errors = [];
        if (CIN && CIN.length !== 21) {
            errors.push('CIN must be exactly 21 characters');
        }
        if (PIN && PIN.length !== 6) {
            errors.push('PIN must be exactly 6 digits');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const client = await updateClientService(req.params.id, { name, CIN, PIN, status, address });
        res.json(client);
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'Failed to update client' });
    }
};

export const deleteClient = async (req, res) => {
    try {
        await deleteClientService(req.params.id);
        res.json({ message: 'Client deleted' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Failed to delete client' });
    }
};

export const searchClients = async (req, res) => {
    try {
        const term = req.query.q;
        const clients = await searchClientsService(term);
        res.json(clients);
    } catch (error) {
        console.error('Error searching clients:', error);
        res.status(500).json({ error: 'Failed to search clients' });
    }
};