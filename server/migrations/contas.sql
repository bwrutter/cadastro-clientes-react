CREATE TABLE contas (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('SIMPLES', 'MENSAL')),
    data_vencimento DATE NOT NULL,
    quantidade_meses INTEGER,
    status VARCHAR(20) DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'PAGO', 'ATRASADO')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 