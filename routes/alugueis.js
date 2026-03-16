import express from 'express'

const router = express.Router();
const alugueis = [];

router.get('/', (request,response) => {
    response.status(200).json(alugueis)
});

router.get('/:id', (request,response) => {
    const id = parseInt(request.params.id);
    const aluguel = alugueis.find(item => item.id === id);
    response.status(200).json(alugueis[id])
});

router.post('/', (request,response) => {
    alugueis.push(request.body)
    response.status(201).send('Moto Cadastrada')
});


export default router;