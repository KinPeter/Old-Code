const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const publicPath = path.join(__dirname, './client');
const port = process.env.PORT || 3000;
const app = express();
let db;

//middleware to user Client folder as static
app.use('/admin', express.static(publicPath));

/*************************************************
 * FUNCTIONS FOR CONNECTION AND GET DATA
 */
//Connect to the database
function openConnection() {
    db = new sqlite3.Database('./links.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return alert(err.message);
        }
        console.log('Connected to the database.');
    });
}
//Close connection to the database
function closeConnection() {
    db.close((err) => {
        if (err) {
            return alert(err.message);
        }
        console.log('Closed the database connection.');
    });
}
//Get data and send back the query result as JSON
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

/*************************************************
 * BASIC API GET ROUTES
 */
//Route to get the FULL NAME LIST (for search autocomplete e.g.)
app.get('/allnames', (req, result) => {   
    openConnection();
    getData(`
    SELECT name FROM toppicks
    UNION
    SELECT name FROM courses
    UNION
    SELECT name FROM docs
    UNION
    SELECT name FROM resources
    UNION
    SELECT name FROM frameworks
    UNION
    SELECT name FROM linux
    ` , result);
    closeConnection();
});
//Route to get ALL ROWS FROM A TABLE (category)
app.get('/cat/:text', (req, result) => { 
    let text = req.params.text;    
    openConnection();
    getData(`SELECT * FROM ${text}`, result);
    closeConnection();
});
//Route to SEARCH in all tables
app.get('/search/:text', (req, result) => { 
    let text = req.params.text;  
    openConnection();
    getData(`
    SELECT * FROM toppicks WHERE name LIKE "%${text}%" 
    UNION 
    SELECT * FROM courses WHERE name LIKE "%${text}%"
    UNION 
    SELECT * FROM docs WHERE name LIKE "%${text}%"
    UNION 
    SELECT * FROM resources WHERE name LIKE "%${text}%"
    UNION 
    SELECT * FROM frameworks WHERE name LIKE "%${text}%"
    UNION 
    SELECT * FROM linux WHERE name LIKE "%${text}%"
    ORDER BY id
    `, result);
    closeConnection();
});
//Route to CHECK CONNECTION to the database
app.get('/check', (req, result) => {
    let db = new sqlite3.Database('./links.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
        result.send('1');
    });
    db.close();
});
//Route to DOWNLOAD the .db file
app.get('/backup', (req, result) => {
    result.download('./links.db');
});


/*************************************************
 * ROUTES TO MODIFY DATABASE
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route to INSERT A NEW ROW into a table
app.post('/insert', (req, result) => { 
    //get data from the request
    let table = req.body.category;
    let name = req.body.name;
    let link = req.body.link;
    console.log(table, name, link);
    //open connection
    openConnection();
    //insert one row into the langs table
    db.run(`INSERT INTO ${table}(category, name, link) VALUES('${table}', '${name}', '${link}')`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    //get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    //close connection
    closeConnection();
    result.end('done');
});

//Route to UPDATE ROW in a table
app.post('/update', (req, result) => { 
    //get data from the request
    let table = req.body.category;
    let name = req.body.name;
    let link = req.body.link;
    let id = req.body.id;
    console.log(table, name, link, id);
    //open connection
    openConnection();
    //insert one row into the langs table
    db.run(`
    UPDATE ${table}
    SET name='${name}', link='${link}'
    WHERE id=${id}`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    //get the last insert id
    console.log(`A row has been updated with rowid ${this.lastID}`);
    });
    //close connection
    closeConnection();
    result.end('done');
});

//Route to DELETE A ROW from a table
app.post('/delete', (req, result) => { 
    //get data from the request
    let table = req.body.category;
    let id = req.body.id;
    console.log(table, id);
    //open connection
    openConnection();
    //insert one row into the langs table
    db.run(`DELETE FROM ${table} WHERE id=${id}`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    //get the last deleted id
    console.log(`A row has been deleted with rowid ${this.lastID}`);
    });
    //close connection
    closeConnection();
    result.end('done');
});

//start the server
app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});