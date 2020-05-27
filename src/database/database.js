/* eslint-disable global-require */
/* eslint-disable no-console */
import { connect, connection } from 'mongoose';

// eslint-disable-next-line import/named
import { NODE_ENV } from './config';

const initDB = () => {
  connect(
    `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@${process.env.DBURI}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  connection.once('open', () => {
    console.log('connected to database');
  });
};

export default initDB;
