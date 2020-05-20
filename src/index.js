import app from './app';

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  app.emit('server listening');
});
