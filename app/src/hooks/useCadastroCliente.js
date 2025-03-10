import { useState } from 'react';
import { cadastrarCliente } from '../api/api';

const useCadastroCliente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cadastrar = async (formData) => {
    console.log("AQUI", formData)
    setLoading(true);
    try {
      const cliente = await cadastrarCliente(formData);
      return cliente;
    } catch (err) {
      console.log(err)
      setError('Erro ao cadastrar cliente. Tente novamente.', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cadastrar,
    loading,
    error,
  };
};

export default useCadastroCliente;
