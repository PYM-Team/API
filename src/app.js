/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { initWS, websockified } from './websockets';
import { initDB } from './database/database';

const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const cors = require('@koa/cors');

initWS();
initDB();

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);
app.ws.use(route.all('/', (ctx) => websockified(ctx)));

app.ws.use(cors);

export default app;
