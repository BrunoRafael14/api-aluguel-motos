import express from 'express'
import usuariosRouter from './routes/usuarios.js';
import motosRouter from './routes/motos.js';
import alugueisRouter from './routes/alugueis.js';

const app = express()
app.use(express.json())

app.use('/usuarios', usuariosRouter);
app.use('/motos', motosRouter);
app.use('/alugueis', alugueisRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});