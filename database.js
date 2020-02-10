/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const initDB = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DBURI}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });
};

module.exports = initDB;
