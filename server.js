'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const connection = require('./connection');

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Listening on port 3000')
});

connection.db.once('open', () => {
    routes(app);
})

