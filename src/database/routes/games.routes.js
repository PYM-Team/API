import Router from 'koa-router';
import {
  helloWorld, createGame, getGame, createPlayer, getPlayers, deleteGame, deletePlayers,
} from '../controllers/games.controller';

const router = new Router();

router.prefix('/api');

// GET
router.get('/', helloWorld);

// GET
router.get('/games/:id', getGame);

// GET
router.get('/players/gameid/:gameId', getPlayers);

// POST
router.post('/games', createGame);

// POST
router.post('/players/gameid/:gameId', createPlayer);

// DELETE
router.del('/games/:id', deleteGame);

// DELETE
router.del('/players/gameid/:gameId', deletePlayers);

export default router;
