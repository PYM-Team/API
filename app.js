/* eslint-disable no-console */
const Koa = require('koa');
const initDB = require('./database');
const gamesRouter = require('./routes/games.route');

initDB();

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(gamesRouter.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
