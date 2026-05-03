import { sql } from "./db.js";
import { randomUUID } from 'node:crypto';

export class Database_usuarios {
    async list(search) {
        let usuarios;

        if (search) {
            usuarios = await sql('SELECT * FROM usuarios WHERE nome LIKE ?', [`%${search}%`]);
        } else {
            usuarios = await sql('SELECT * FROM usuarios');
        }

        return usuarios;
    }

    async create(usuario) {
        await sql(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
            [usuario.nome, usuario.email, usuario.senha]
        );
    }

    async update(id, usuario) {
        await sql(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', 
            [usuario.nome, usuario.email, usuario.senha, id]
        );
    }

    async delete(id) {
        await sql('DELETE FROM usuarios WHERE id = ?', [id]);
    }   
}