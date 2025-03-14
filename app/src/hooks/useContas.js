import { useState } from 'react';
import { cadastrarConta as apiCadastrarConta, 
         listarContas as apiListarContas,
         excluirConta as apiExcluirConta,
         atualizarStatusConta as apiAtualizarStatusConta } from '../api/api';

const useContas = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCadastrarConta = async (contaData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCadastrarConta(contaData);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleListarContas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiListarContas();
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleExcluirConta = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await apiExcluirConta(id);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleAtualizarStatusConta = async (id, status) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiAtualizarStatusConta(id, status);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        cadastrarConta: handleCadastrarConta,
        listarContas: handleListarContas,
        excluirConta: handleExcluirConta,
        atualizarStatusConta: handleAtualizarStatusConta,
        loading,
        error
    };
};

export default useContas; 