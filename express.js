const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users.routes.js')

const app = express()

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRouter)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})
