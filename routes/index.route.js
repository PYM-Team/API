const Router = require('koa-router');

const router = new Router();
router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'RestAPI homepage !',
  };
});
module.exports = router;
