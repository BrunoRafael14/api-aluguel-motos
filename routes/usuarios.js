import express from 'express'
import db from '../db/connection.js'

const router = express.Router();
const usuarios = [];

router.get('/', async (request,response) => {
    const resultado = await db.query('SELECT * FROM usuarios');
    response.status(200).json(resultado.rows)
});

router.get('/:id', async (request,response) => {
    const resultado = await db.query('SELECT * FROM usuarios WHERE id = $1', [request.params.id]);
    response.status(200).json(resultado.rows[0])
});

router.post('/', async (request,response) => {
    const { nome, cpf, telefone } = request.body;
    await db.query('INSERT INTO usuarios (nome, cpf, telefone) VALUES ($1, $2, $3)', [nome, cpf, telefone]);
    response.status(201).send('Usuário Cadastrado')
});

router.put('/:id', async (request, response) => {
    const { nome, cpf, telefone } = request.body;
    await db.query('UPDATE usuarios SET nome=$1, cpf=$2, telefone=$3 WHERE id=$4', [nome, cpf, telefone, request.params.id]);
    response.status(200).send('Usuário Atualizado');
});

router.delete('/:id', async (request, response) => {
    await db.query('DELETE FROM usuarios WHERE id=$1', [request.params.id]);
    response.status(200).send('Usuário Deletado');
});


export default router;