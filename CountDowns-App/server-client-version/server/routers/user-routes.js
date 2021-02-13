const express = require('express')
const bc = require('bcrypt')
const {openConnection, closeConnection, getData} = require('../db-connection/db')
const {generateUserId, generateCdId} = require('../modules/ID-generator')
const router = new express.Router()

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})


// router.get('/allusers', (req, res) => {   
//     openConnection()
//     getData(`SELECT * FROM users` , res)
//     closeConnection()
// })

router.get('/finduser/:id', (req, res) => {  
    const id = req.params.id 
    openConnection()
    getData(`SELECT * FROM users WHERE userid='${id}'` , res)
    closeConnection()
})

router.post('/signup', async (req, res) => {  
    const name = req.body.name
    const email = req.body.email
    const pass = await bc.hash(req.body.pass, 8)
    const userid = generateUserId()
    const db = openConnection()
    db.run(`
        INSERT INTO users
        (userid, name, email, pass) 
        VALUES('${userid}', '${name}', '${email}', '${pass}')`, 
        function(err) {
            if (err) {
                res.end('Error: '+ err.message)
                console.log('User creation error. ', err.message)
            } else {
                res.end('done')
                console.log(`A new user has been created: ${userid}, ${name}, ${email}`)
            }
        })
    closeConnection()
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass
    const db = openConnection()
    function getUserByEmail(email, callback){
        db.all(`SELECT * FROM users WHERE email='${email}'`, function (err, rows) {
            if (err || rows.length<1) {
                res.end('error')
            } else {
                callback(rows[0])
            }
        })
    }
    async function verifyUserPassword(user) {
        const isMatch = await bc.compare(pass, user.pass)
        if (!isMatch) {
            res.end('error')
        } else {
            res.end(user.userid.toString())
        }
    }    
    getUserByEmail(email, verifyUserPassword)
    closeConnection()
})

router.post('/deleteuser', (req, res) => {
    const id = req.body.id
    const db = openConnection()
    db.run(`DELETE FROM users WHERE userid='${id}'`, function(err) {
        if (err) {
            res.end('Error: '+ err.message)
            return console.log(err.message)
        } else {
            res.end('done');
            console.log(`A row has been deleted with id: ${id}`)
        }
    })
    closeConnection()
})

module.exports = router