/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);

app.ws.use(route.all('/', (ctx) => {
  // the websocket is added to the context as `ctx.websocket`.
  ctx.websocket.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(data);

    switch (data.type) {
      case 'testId':
        if (data.id == '101938') {
          const content = {
            type: 'isCorrectId',
            result: 1,
          };
          ctx.websocket.send(JSON.stringify(content));
        } else {
          const content = {
            type: 'isCorrectId',
            result: 0,
          };
          ctx.websocket.send(JSON.stringify(content));
        }
        break;

      default:
        break;
    }

  });
}));

app.listen(3000);
