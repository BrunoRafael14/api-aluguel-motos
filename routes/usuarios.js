import express from 'express'

const router = express.Router();
const usuarios = [];

router.get('/', (request,response) => {
    response.status(200).json(usuarios)
});

router.get('/:id', (request,response) => {
    const id = parseInt(request.params.id);
    const usuario = usuarios.find(item => item.id === id);
    response.status(200).json(usuarios[id])
});

router.post('/', (request,response) => {
    usuarios.push(request.body)
    response.status(201).send('Usuário Cadastrado')
});


export default router;