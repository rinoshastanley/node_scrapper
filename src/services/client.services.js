import Client from '../models/companyDetails.model.js';

export const getAllClients = async () => {
    try {
        return await Client.findAll();
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const createClient = async (clientData) => {
    try {
        return await Client.create(clientData);
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

export const getClientById = async (id) => {
    try {
        return await Client.findByPk(id);
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    }
};

export const updateClient = async (id, updateData) => {
    try {
        const client = await getClientById(id);
        if (!client) {
            throw new Error('Client not found');
        }
        return await client.update(updateData);
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        const client = await getClientById(id);
        if (!client) {
            throw new Error('Client not found');
        }
        return await client.destroy();
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};

export const searchClients = async (term) => {
    try {
        return await Client.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { id: term },
                    { name: { [Sequelize.Op.like]: `%${term}%` } },
                    { CIN: { [Sequelize.Op.like]: `%${term}%` } },
                    { email: { [Sequelize.Op.like]: `%${term}%` } },
                ],
            },
        });
    } catch (error) {
        console.error('Error searching clients:', error);
        throw error;
    }
};