import express from 'express'

const router = express.Router();
const motos = [];

router.get('/', (request,response) => {
    response.status(200).json(motos)
});

router.get('/:id', (request,response) => {
    const id = parseInt(request.params.id);
    const moto = motos.find(item => item.id === id);
    response.status(200).json(motos[id])
});

router.post('/', (request,response) => {
    motos.push(request.body)
    response.status(201).send('Moto Cadastrada')
});

export default router;