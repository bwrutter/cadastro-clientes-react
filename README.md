# Sistema de Cadastro de Clientes

Este é um sistema de cadastro de clientes desenvolvido com React (frontend) e Node.js/Express (backend).

## Estrutura do Projeto

```
.
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/           # Integrações com API
│   │   ├── assets/        # Recursos estáticos
│   │   ├── components/    # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Páginas da aplicação
│   │   └── utils/        # Utilitários
│   └── ...
│
└── server/                 # Backend (Node.js + Express)
    ├── config/            # Configurações
    ├── controllers/       # Controladores
    ├── migrations/        # Migrações do banco
    ├── models/           # Modelos
    └── routes/           # Rotas da API
```

## Requisitos

- Node.js 18+
- PostgreSQL 12+

## Como Executar

### Backend

1. Entre na pasta do servidor:
```bash
cd server
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor:
```bash
npm start
```

### Frontend

1. Entre na pasta do frontend:
```bash
cd app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Tecnologias Utilizadas

- Frontend:
  - React
  - Material-UI
  - Axios
  - Vite

- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - pg (node-postgres)
