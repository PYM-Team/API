/* eslint-disable no-console */
import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import initDB from './database';
import initSocketIO from './socketio';
import gameRouter from './routes/games.route';


const app = new Koa();
const server = require('http').createServer(app.callback());
const cors = require('@koa/cors');

initDB();

app.use(cors());
const PORT = process.env.PORT || 1337;

app.use(bodyparser());
app.use(gameRouter.routes());

initSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
