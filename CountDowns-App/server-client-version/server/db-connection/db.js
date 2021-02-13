const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'countdowns.db')
let db


/*************************************************
 * FUNCTIONS FOR CONNECTION AND GET DATA
 */
//Connect to the database
function openConnection() {
    return db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log("openConnection() Error: " + err.message)
        }
        console.log('Connected to the database.')
    });
}
//Close connection to the database
function closeConnection() {
    db.close((err) => {
        if (err) {
            return console.log("closeConnection() Error: " + err.message)
        }
        console.log('Closed the database connection.')
    });
}
//Get data and send back the query result as JSON
function getData(query, result) {
    db.all(query, {}, (err, rows) => {
        if (err) {
            return console.log('getData() Error: ' + err.message)
        }
        if (rows.length < 1) {
            console.log('getData() Error: No data found.')
            return result.status(404).send('Unable to find data.')
        }
        console.log('getData() Fetch successful.')
        result.status(200).send(rows)
    });
}

module.exports = {
    openConnection,
    closeConnection,
    getData
}