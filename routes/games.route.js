const Router = require('koa-router');

const router = new Router();
const gamesController = require('../controllers/games.controller');

router.prefix('/api');

// GET
router.get('/games', gamesController.helloWorld);

// POST
router.post('/games', gamesController.createGame);

module.exports = router;
