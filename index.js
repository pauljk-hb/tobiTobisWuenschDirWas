const express = require("express");
const datastore = require('nedb');
const sassMiddleware = require('node-sass-middleware')

const app = express();
app.listen(3000, () => console.log('Turbo Tobi läuft auf Port 3000'))
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))
app.use(sassMiddleware({
    src: __dirname,
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
}));

const datbase = new datastore('database.db');
datbase.loadDatabase();

//Routes
app.post('/api', (req, res) => {
    const data = req.body;
    console.log(data);
    datbase.insert(data);
    res.end;
});

app.get('/tobi-all', (req, res) => {
    datbase.find({}, (err, data) =>{
        if (err) {
            res.json({status: 'falied'});
            console.log(err);
            return;
        }
        res.json(data);
    })
})
