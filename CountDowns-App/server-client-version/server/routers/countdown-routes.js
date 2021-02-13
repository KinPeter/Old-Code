const express = require('express')
const {openConnection, closeConnection, getData} = require('../db-connection/db')
const {generateUserId, generateCdId} = require('../modules/ID-generator')
const router = new express.Router()

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

// router.get('/allcds', (req, result) => {   
//     openConnection()
//     getData(`SELECT * FROM countdowns` , result)
//     closeConnection()
// })
router.get('/fetchcds/:id', (req, res) => {  
    const id = req.params.id 
    openConnection()
    getData(`SELECT * FROM countdowns WHERE userid='${id}'` , res)
    closeConnection()
})

router.post('/createcd', (req, res) => {  
    const timestamp = req.body.timestamp
    const descr = req.body.descr
    const userid = req.body.userid
    const cdownid = generateCdId()
    const db = openConnection()
    db.run(`
        INSERT INTO countdowns
        (cdownid, timestamp, descr, userid) 
        VALUES('${cdownid}', '${timestamp}', '${descr}', '${userid}')`, 
        function(err) {
            if (err) {
                res.end('Error: '+ err.message)
                console.log('Countdown creation error. ', err.message)
            } else {
                res.end('done')
                console.log(`A new countdown has been created by user ${userid}: ${descr}, ${cdownid}, ${timestamp}`)
            }
        })
    closeConnection()
})

router.post('/deletecd', (req, res) => {
    const id = req.body.cdownid
    const db = openConnection()
    db.run(`DELETE FROM countdowns WHERE cdownid='${id}'`, function(err) {
        if (err) {
            res.end('Error: '+ err.message)
            return console.log(err.message)
        } else {
            console.log(`A row has been deleted with id: ${id}`)
            res.end('done')
        }
    })
    closeConnection()
})

router.post('/deleteallcds', (req, res) => {
    const id = req.body.id
    const db = openConnection()
    db.run(`DELETE FROM countdowns WHERE userid='${id}'`, function(err) {
        if (err) {
            res.end('Error: '+ err.message)
            return console.log(err.message)
        } else {
            res.end('done')
            console.log(`All countdowns have been deleted for user id: ${id}`)
        }
    })
    closeConnection()
})

module.exports = router