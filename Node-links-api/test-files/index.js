const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const port = process.env.PORT || 3000;
let app = express();
let db;

function openConnection() {
    db = new sqlite3.Database('./testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return alert(err.message);
        }
        console.log('Connected to the database.');
    });
}

function closeConnection() {
    db.close((err) => {
        if (err) {
            return alert(err.message);
        }
        console.log('Closed the database connection.');
    });
}

function getData(query, result) {
    db.all(query, {}, (err, rows) => {
        if (err) {
            return alert(err.message);
        }
        if (rows.length < 1) {
            return result.status(404).send('Unable to find that link.');
        }
        result.status(200).send(rows);
    });
}

app.get('/all', (req, result) => {   
    openConnection();
    getData('SELECT * FROM toppicks UNION SELECT * FROM schools ORDER BY id', result);
    closeConnection();
});

app.get('/test', (req, result) => {   
    openConnection();
    getData('SELECT name, link FROM toppicks WHERE name LIKE "%git%"', result);
    closeConnection();
});

app.get('/search/:text', (req, result) => { 
    let text = req.params.text;  
    openConnection();
    getData(`
    SELECT * FROM toppicks WHERE name LIKE "%${text}%" 
    UNION 
    SELECT * FROM schools WHERE name LIKE "%${text}%"
    ORDER BY id
    `, result);
    closeConnection();
});

//start the server
app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});