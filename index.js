const express = require("express");
const datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('Turbo Tobi läuft auf Port 3000'))
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const datbase = new datastore('database.db');
datbase.loadDatabase();

//Routes
app.post('/api', (req, res) => {
    const data = req.body;
    console.log(data);
    datbase.insert(data);
    res.end;
});

app.get('/api', (req, res) => {
    
})