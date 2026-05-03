import {fastify} from 'fastify';

import { Database_usuarios } from './database_usuarios.js';

import { usuarios } from './usuarios.js';

const server = fastify();   

const database_usuarios = new Database_usuarios();

server.decorate('db_usuarios', database_usuarios);

server.register(usuarios);

const port = process.env.PORT || 3333;

server.listen({ 
    port: Number(port), 
    host: '0.0.0.0' 
}).then(() => {
    console.log(`Servidor rodando na porta ${port}!`);
}).catch(err => {
    console.log("Erro ao subir o servidor:", err);
    process.exit(1);
});


