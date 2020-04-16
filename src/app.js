/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { websockified } from './websockets';

const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);
const cors = require('@koa/cors');

app.ws.use(route.all('/', (ctx) => websockified(ctx)));

app.ws.use(cors);

const PORT = process.env.PORT || 1337;

app.listen(PORT);
