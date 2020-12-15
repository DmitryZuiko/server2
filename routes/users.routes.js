const express = require('express');
const router = express.Router();

// const logPath = require("../middlewares/log-path.middleware");
const controller = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

router
    .get('/', auth, controller.get)
    .get('/me', auth, controller.getMe)
    .get('/:id', auth, controller.getUser)
    .post('/', controller.add)
    .post('/login', controller.login)
    .put('/:id', auth, controller.rewrite)
    .delete('/:id', auth, controller.delete)
    // .get('/refreshAccess', controller.login)

module.exports = router;