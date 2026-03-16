import express from 'express'
import db from '../db/connection.js'

const router = express.Router();
const alugueis = [];

router.get('/', async (request,response) => {
    const resultado = await db.query('SELECT * FROM alugueis');
    response.status(200).json(resultado.rows)
});

router.get('/:id', async (request,response) => {
    const resultado = await db.query('SELECT * FROM alugueis WHERE id = $1', [request.params.id]);
    response.status(200).json(resultado.rows[0])
});

router.post('/', async (request,response) => {
    const { usuario_id, moto_id } = request.body;
    await db.query('INSERT INTO alugueis (usuario_id, moto_id) VALUES ($1, $2)', [usuario_id, moto_id]);
    await db.query('UPDATE motos SET disponivel = FALSE WHERE id = $1', [moto_id]);
    response.status(201).send('Moto Cadastrada')
});

router.put('/:id', async (request, response) => {
    const aluguel = await db.query('SELECT * FROM alugueis WHERE id = $1', [request.params.id]);
    await db.query('UPDATE alugueis SET data_fim = CURRENT_DATE, ativa = FALSE WHERE id = $1', [request.params.id]);
    await db.query('UPDATE motos SET disponivel = TRUE WHERE id = $1', [aluguel.rows[0].moto_id]);
    response.status(200).send('Aluguel Encerrado');
});

router.delete('/:id', async (request, response) => {
    await db.query('DELETE FROM alugueis WHERE id=$1', [request.params.id]);
    response.status(200).send('Aluguel Deletado');
});


export default router;