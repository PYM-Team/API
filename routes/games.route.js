import Router from 'koa-router';
import { helloWorld, createGame } from '../controllers/games.controller';

const router = new Router();

router.prefix('/api');

// GET
router.get('/games', helloWorld);

// POST
router.post('/games', createGame);

export default router;
