'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const connection = require('./connection');

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

connection.db.once('open', () => {
    routes(app);
    app.listen(process.env.PORT || 3000, () => {
        console.log('Listening on port '+ process.env.PORT || 3000)
    });
})

