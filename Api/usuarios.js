export async function usuarios(app) {
  app.post('/usuarios', async (req, reply) => {
    const { nome, email, senha } = req.body;

    await app.db_usuarios.create({
      nome,
      email,
      senha
    });

    return reply.status(201).send();
  });

  app.get('/usuarios', async (req, reply) => {
    const search = req.query.search;

    const usuarios = await app.db_usuarios.list(search);

    return usuarios;
  });

  app.put('/usuarios/:id', async (req, reply) => {
    const usuarioid = req.params.id;

    await app.db_usuarios.update(usuarioid, {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    });

  });

  app.delete('/usuarios/:id', async (req, reply) => {
    const usuarioid = req.params.id;

    await app.db_usuarios.delete(usuarioid);

    return reply.status(204).send();
  });
}