/* eslint-disable no-console */
import Koa from 'koa';
import { initSocketIO } from './socketio';


const app = new Koa();
const server = require('http').createServer(app.callback());

const PORT = process.env.PORT || 1337;

initSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
