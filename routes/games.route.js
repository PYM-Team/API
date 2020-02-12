import Router from 'koa-router';
import { helloWorld, createGame, getGame } from '../controllers/games.controller';

const router = new Router();

router.prefix('/api');

// GET
router.get('/', helloWorld);

// GET
router.get('/games/:id', getGame);

// POST
router.post('/games', createGame);

export default router;
