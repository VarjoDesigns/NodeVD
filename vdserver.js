const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({limit:'5mb', extended: true}));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('varjo.db');

app.listen(8080, () => {
    console.log('Node is running on port: 8080');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Server is running' });
});

app.get('/customer', (req, res, next) => {
    db.all("SELECT * FROM customer", (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
    })
});

app.get('/form', (req, res, next) => {
    db.all("SELECT * FROM form", (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
    })
});

app.get('/*',  (req, res, next) => {
        return res.status(404).json( {error: true, message: 'The service you are looking for is not available'} );
})