const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users.routes.js')
const fs = require('fs')

const file = fs.readFile('./express-server/users.json', 'utf-8', (err, content) => {
    if(err) {
        throw err
    }
})

const app = express()


app.use(bodyParser.json());

app.use('/users', usersRouter)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})

module.exports = file;