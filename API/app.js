const express = require('express');
const cors = require('cors');
const app = express();

const login = require('./login');
const encode = require('./encode');
const authorisation = require('./middleware/authorization')

app.use(express.json());

app.use(cors());

app.post('/login', login);

app.use(authorisation);

app.post('/encode', encode);

module.exports = app;

