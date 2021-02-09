require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch( e => {
    console.log(e)
    throw new Error('Unable to connect to database')
})

module.exports.db = mongoose.connection;
