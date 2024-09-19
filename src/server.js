const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port:9000,
    host:'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return h.response({
        status: 'success',
        message: 'berhasil',
        data: []
      });
    }
  });

  await server.start();
  console.log(`server running at ${server.info.uri}`);
};

init();