import { useState, useEffect } from 'react';
import { getClientes } from '../api/api';

const useListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError("Erro ao carregar os clientes.");
        console.error("Erro ao carregar clientes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return { clientes, loading, error };
};

export default useListarClientes;
