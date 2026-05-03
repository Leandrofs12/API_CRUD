import { sql } from "./db.js";

export class Database_usuarios {
    async list(search) {
        let usuarios;

        if (search) {
            usuarios = await sql`
                SELECT * FROM usuarios 
                WHERE nome ILIKE ${'%' + search + '%'}
            `;
        } else {
            usuarios = await sql`SELECT * FROM usuarios`;
        }

        return usuarios;
    }

    async create(usuario) {
        const { nome, email, senha } = usuario;
        
        await sql`
            INSERT INTO usuarios (nome, email, senha) 
            VALUES (${nome}, ${email}, ${senha})
        `;
    }

    async update(id, usuario) {
        const { nome, email, senha } = usuario;

        await sql`
            UPDATE usuarios 
            SET nome = ${nome}, email = ${email}, senha = ${senha} 
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`DELETE FROM usuarios WHERE id = ${id}`;
    }   
}