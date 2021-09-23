const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('varjo.db');

// Serialisoidaan jotta käskyt suoritetaan synkronisesti (default on async)
db.serialize( () => {

    let sql = 'CREATE TABLE customer(' + 
    'id INTEGER PRIMARY KEY NOT NULL, ' +
    'name text NOT NULL, ' +
    'description text NOT NULL, ' +
    'image text )';

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer table was succesfully created");
    })

    sql = 'CREATE TABLE form(' + 
    'id INTEGER PRIMARY KEY NOT NULL, ' +
    'title text NOT NULL, ' +
    'description text NOT NULL, ' +
    'email text NOT NULL )';

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Form table was succesfully created");
    })

    sql = "INSERT INTO 'customer' ('id', 'name', 'description', 'image') " + " Values (1, 'DonJoewonSong', 'Logos, brand identity, liveries, templates...', null)";
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer added")
    })

    sql = "INSERT INTO 'customer' ('id', 'name', 'description', 'image') " + " Values (2, 'Wreckfest', 'Liveries', null)";
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer added")
    })

    sql = "INSERT INTO 'customer' ('id', 'name', 'description', 'image') " + " Values (3, 'FaDa Racing', 'Logos, brand identity, Cayman GT4 livery', null)";
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer added")
    })

    sql = "INSERT INTO 'customer' ('id', 'name', 'description', 'image') " + " Values (4, 'RWB Nordics', 'Web design', null)";
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer added")
    })

    sql = "INSERT INTO 'form' ('id', 'title', 'description', 'email') " + " Values (1, 'Test form', 'This is what form submissions will look like', 'test.form@varjodesigns.com')";
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Customer added")
    })

})

db.each("SELECT id, name, description FROM customer", (err, row) => {
    if (err) {
        return console.log(err.message);
    }
    console.log(row.id + ", " + row.nimi);
})

db.close();