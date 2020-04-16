/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export const websockified = (ctx) => {
  // the websocket is added to the context as `ctx.websocket`.
  ctx.websocket.on('message', (event) => {
    console.log(event);
    const data = JSON.parse(event);
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
};
