import express from 'express'
import db from '../db/connection.js'

const router = express.Router();
const motos = [];

router.get('/', async (request,response) => {
    const result = await db.query('SELECT * FROM motos');
    response.status(200).json(result.rows);
});

router.get('/:id', async (request,response) => {
    const result = await db.query('SELECT * FROM motos WHERE id = $1', [request.params.id]);
    response.status(200).json(result.rows[0])
});

router.post('/', async (request,response) => {
    const { marca, modelo, placa } = request.body;
    await db.query('INSERT INTO motos (marca, modelo, placa) VALUES ($1, $2, $3)', [marca, modelo, placa]);
    response.status(201).send('Moto Cadastrada')
});

router.put('/:id', async (request, response) => {
    const { marca, modelo, placa } = request.body;
    await db.query('UPDATE motos SET marca=$1, modelo=$2, placa=$3 WHERE id=$4', [marca, modelo, placa, request.params.id]);
    response.status(200).send('Moto Atualizada');
});

router.delete('/:id', async (request, response) => {
    await db.query('DELETE FROM motos WHERE id=$1', [request.params.id]);
    response.status(200).send('Moto Deletada');
});


export default router;