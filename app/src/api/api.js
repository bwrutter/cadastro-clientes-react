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

// Funções para gerenciar contas
export const cadastrarConta = async (contaData) => {
    try {
        console.log('Dados enviados:', contaData);
        if (contaData.id) {
            console.log('Atualizando conta:', contaData.id);
            const response = await api.put(`/contas/${contaData.id}`, {
                descricao: contaData.descricao,
                valor: contaData.valor,
                tipo: contaData.tipo,
                data_vencimento: contaData.data_vencimento,
                quantidade_meses: contaData.quantidade_meses
            });
            return response.data;
        } else {
            console.log('Criando nova conta');
            const response = await api.post('/contas', contaData);
            return response.data;
        }
    } catch (error) {
        console.error('Erro ao cadastrar/atualizar conta:', error.response || error);
        throw error;
    }
};

export const listarContas = async () => {
    try {
        const response = await api.get('/contas');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar contas:', error);
        throw error;
    }
};

export const atualizarStatusConta = async (id, status) => {
    try {
        const response = await api.patch(`/contas/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar status da conta:', error);
        throw error;
    }
};

export const excluirConta = async (id) => {
    try {
        await api.delete(`/contas/${id}`);
    } catch (error) {
        console.error('Erro ao excluir conta:', error);
        throw error;
    }
};

export default api;
