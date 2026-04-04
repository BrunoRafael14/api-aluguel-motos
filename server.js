import express from 'express'
import usuariosRouter from './routes/usuarios.js';
import motosRouter from './routes/motos.js';
import alugueisRouter from './routes/alugueis.js';
import loginRouter from './routes/login.js';
import authenticateToken from './authMiddleware.js';
import dotenv from "dotenv";

dotenv.config()
const app = express()
app.use(express.json())

app.use('/login', loginRouter)
app.use('/usuarios', authenticateToken, usuariosRouter);
app.use('/motos', authenticateToken, motosRouter);
app.use('/alugueis', authenticateToken, alugueisRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});