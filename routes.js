const isUrl = require('is-valid-http-url');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: String
});

let Link = mongoose.model('Link', urlSchema);

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + '/views/index.html')
    });

    app.post('/api/shorturl/new', (req, res) => {
        let inputUrl = req.body.url;
        if (isUrl(inputUrl)) {
           Link.find({
                original_url: inputUrl
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    throw new Error('An error occured. Please try again.')
                } else {
                    if (data.length > 0) {
                        return res.send({
                            original_url: data[0].original_url,
                            short_url: data[0].short_url
                        })
                    } else {
                        new Link({
                            original_url: inputUrl,
                            short_url: nanoid(7)
                        }).save((err, doc) => { 
                            if (err) {
                                console.log(err);
                                throw new Error('An error occured. Please try again.')
                            }
                            return res.send({
                                original_url: doc['original_url'],
                                short_url: doc['short_url']
                            })
                        })
                    }
                }
            })
        } else {
            return res.send({
                error: 'Invalid URL'
            })
        }
    });

    app.get('/:id', (req, res) => {
        Link.find({
            short_url: req.params.id
        }, (err, data) => {
            if (err) {
                console.log(err)
                throw new Error('An error occured. Please try again.')
            } else {
                if (data.length > 0) {
                    res.redirect(data[0].original_url)
                } else {
                    res.send('No short URL found for the given input')
                }
            }
        })
    });

    app.use((req, res, next) => {
        res.status(404)
          .type('text')
          .send('Not Found');
    });
}