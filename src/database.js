/* eslint-disable global-require */
/* eslint-disable no-console */
import { connect, connection } from 'mongoose';
import fs from 'fs';
import path from 'path';

// add this line to fix deployement problem
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const initDB = () => {
  connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DBURI}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  connection.once('open', () => {
    console.log('connected to database');
  });
};

export default initDB;
