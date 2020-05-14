const express = require('express');
const nodemon = require('nodemon');

const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000)