import express from 'express'
import db from '../db/connection.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config()
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY

router.post('/', async (req, res) => {
    const {nome, cpf} = req.body;

    const user = await db.query('SELECT * FROM usuarios WHERE nome = $1 AND cpf = $2', [nome, cpf]);

    if(user){
        const token = jwt.sign({ id: user.id, nome: user.nome, cpf: user.cpf, telefone: user.telefone}, SECRET_KEY, { expiresIn: '1h'});

        res.status(201).json({
            message: token
        })
    } else {
        res.status(401).json({
            message: 'Nome ou CPF inválido'
        });
    }
})

export default router;