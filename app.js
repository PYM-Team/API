import Koa from 'koa';
import initDB from './database';
import gameRouter from './routes/games.route';

initDB();

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(gameRouter.routes());

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
