import { fastify } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { Database_usuarios } from './database_usuarios.js';
import { usuarios } from './usuarios.js';
import { Login } from './login.js'; 

const server = fastify();
const database_usuarios = new Database_usuarios();
const loginService = new Login(); 

server.register(fastifyJwt, {
  secret: 'sua_senha_super_secreta_aqui'
});

server.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: "Token inválido ou ausente" });
  }
});

server.decorate('db_usuarios', database_usuarios);

server.post('/login', async (request, reply) => {
  const { email, senha } = request.body;

  const user = await loginService.findByEmail(email);

  if (!user || user.senha !== senha) {
    return reply.status(401).send({ message: 'E-mail ou senha incorretos' });
  }

  const token = server.jwt.sign({ 
    id: user.id, 
    nome: user.nome 
  });

  return { token };
});

server.register(usuarios);

const port = process.env.PORT || 3000;

server.listen({ 
    port: Number(port), 
    host: '0.0.0.0' 
}).then(() => {
    console.log(`Servidor rodando na porta ${port}!`);
}).catch(err => {
    console.log("Erro ao subir o servidor:", err);
    process.exit(1);
});
