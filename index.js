const express = require("express");
const datastore = require('nedb');
const sassMiddleware = require('node-sass-middleware')

const app = express();
app.listen(process.env.PORT || 3000, () => console.log('Turbo Tobi läuft auf Port 3000'))
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

    if (data.songVal && data.bandVal) {
        datbase.insert(data);
    }
    res.end;
});

app.post('/tobi-change', (req, res) => {
    const data = req.body;
    const id = data._id
    console.log(id);

    datbase.update( { _id: id }, {$set: { playedVal: true }}, (err, numReplec) => {
        if(err){
            return
        }
        numReplec = 1;
    })
    res.end;
});

app.post('/tobi-remove', (req, res) => {
    const data = req.body;
    const id = data._id
    console.log(id);

    datbase.remove( { _id: id }, {}, (err) => {
        if(err){
            return
        }
    })
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

app.get('/tobi-played', (req, res) =>{
    datbase.find({ playedVal: true }, (err, data) =>{
        if(err){
            res.json({status: 'falied'});
            console.log(err);
            return;
        }
        res.json(data);
    })
})

app.get('/tobi-wishes', (req, res) =>{
    datbase.find({ playedVal: false }, (err, data) =>{
        if(err){
            res.json({status: 'falied'});
            console.log(err);
            return;
        }
        res.json(data);
    })
})

// datbase.find({ _id: "1iYGiPgaO9MgpIRF" }, (err, data) =>{ console.log(data)})