import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const cadastrarCliente = async (clienteData) => {
    try {
        const response = await api.post('/clientes', clienteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        throw error;
    }
};

export const getClientes = async () => {
    try {
        const response = await api.get('/clientes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
};

export const criarCliente = async (clienteData) => {
    try {
        const response = await api.post('/clientes', clienteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
    }
};
