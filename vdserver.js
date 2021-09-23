const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({limit:'5mb', extended: true}));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('varjo.db');

// Console confirmartion on server start
app.listen(8080, () => {
    console.log('Node is running on port: 8080');
});

// Index
app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Server is running' });
});



// CUSTOMER

// Get
app.get('/customer', (req, res, next) => {
    db.all("SELECT * FROM customer", (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
    })
});

// Get one
app.get('/customer/:id', (req, res, next) => {
    let id = req.params.id;
    db.all("SELECT * FROM customer where id=?",[id], (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    })
});

// Post
app.post('/customer/add',  (req, res, next) => {
    let tap = req.body;
    let image = null;

    db.run("INSERT INTO 'customer' (name, description, image) VALUES (?, ?, ?)", [tap.name, tap.description, image], function (error, result) {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    })
})



// FORM

// Get
app.get('/form', (req, res, next) => {
    db.all("SELECT * FROM form", (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
    })
});

// Get one
app.get('/form/:id', (req, res, next) => {
    let id = req.params.id;
    db.all("SELECT * FROM form where id=?",[id], (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    })
});

// Post
app.post('/form/add',  (req, res, next) => {
    let tap = req.body;

    db.run("INSERT INTO 'form' (title, description, email) VALUES (?, ?, ?)", [tap.title, tap.description, tap.email], function (error, result) {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    })
})


// Fallback if URL is not designated
app.get('/*',  (req, res, next) => {
        return res.status(404).json( {error: true, message: 'The service you are looking for is not available'} );
})