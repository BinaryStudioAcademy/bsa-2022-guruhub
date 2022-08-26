const net = require('net');
const { config } = require('dotenv');

config();

const PORT = Number(process.env.PORT ?? '3001');
const HOST = 'localhost';
const TIMEOUT = 500;
const MAX_TRIES = 30;

const main = async () => {
  let currentTry = 0;

  while (currentTry < MAX_TRIES) {
    const up = await new Promise((resolve) => {
      const socket = net.connect({ port: PORT, host: HOST }, () => {
        socket.destroy();
        resolve(true);
      });

      socket.on('error', () => {
        /* noop */
      });

      setTimeout(() => {
        socket.destroy();
        resolve(false);
      }, TIMEOUT);
    });

    if (up) {
      return;
    }

    currentTry++;
  }

  throw new Error('Backend did not start.');
};

main();
