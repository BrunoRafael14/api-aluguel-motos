# API de Aluguel de Motos

API REST desenvolvida com Node.js, Express e PostgreSQL para gerenciamento de um sistema de aluguel de motos.

## Funcionalidades

- Cadastro, edição, listagem e exclusão de usuários
- Cadastro, edição, listagem e exclusão de motos
- Registro de aluguéis associando um usuário a uma moto
- Encerramento de aluguel com devolução automática da moto

## Tecnologias

- Node.js
- Express
- PostgreSQL

## Endpoints

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /usuarios | Lista todos os usuários |
| GET | /usuarios/:id | Busca um usuário por ID |
| POST | /usuarios | Cadastra um novo usuário |
| PUT | /usuarios/:id | Atualiza um usuário |
| DELETE | /usuarios/:id | Remove um usuário |

### Motos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /motos | Lista todas as motos |
| GET | /motos/:id | Busca uma moto por ID |
| POST | /motos | Cadastra uma nova moto |
| PUT | /motos/:id | Atualiza uma moto |
| DELETE | /motos/:id | Remove uma moto |

### Aluguéis
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /alugueis | Lista todos os aluguéis |
| GET | /alugueis/:id | Busca um aluguel por ID |
| POST | /alugueis | Registra um novo aluguel |
| PUT | /alugueis/:id | Encerra um aluguel |
| DELETE | /alugueis/:id | Remove um aluguel |

## Como rodar

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando

### Banco de dados

Crie o banco e as tabelas rodando o script abaixo no psql ou pgAdmin:

```sql
CREATE DATABASE moto_rental;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15)
);

CREATE TABLE motos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE alugueis (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id),
    moto_id INT NOT NULL REFERENCES motos(id),
    data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    data_fim DATE,
    ativa BOOLEAN DEFAULT TRUE
);
```

### Configuração da conexão

Este repositório não inclui o arquivo `db/connection.js` pois ele contém as credenciais do banco. Crie a pasta `db` na raiz do projeto e o arquivo `connection.js` com o seguinte conteúdo, preenchendo com suas credenciais:

```js
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'moto_rental',
    user: 'postgres',
    password: 'sua_senha'
});

export default pool;
```

### Instalação e execução

```bash
npm install
node server.js
```

O servidor vai rodar em `http://localhost:3000`.