const express = require('express')
const bodyParser = require('body-parser')

// create the express webapp object
const app = express()
const port = process.env.PORT || 3000

// middleware for express automatically parse requests as JSON
app.use(express.json())

// use body-parser middleware to handle request bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// import and use the router files for URL routings
const userRouter = require('./routers/user-routes')
app.use(userRouter)
const cdRouter = require('./routers/countdown-routes')
app.use(cdRouter)

// start up the server app
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})