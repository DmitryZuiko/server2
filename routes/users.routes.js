const express = require('express');
const router = express.Router();

// const logPath = require("../middlewares/log-path.middleware");
const controller = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");
const multerMiddleware = require("../middlewares/multer.middleware");

router
    .get('/', auth, controller.get)
    .get('/me', auth, controller.getMe)
    .get('/:id', auth, controller.getUser)
    .post('/', multerMiddleware, controller.add)
    .post('/login', controller.login)
    // .put('/:id', controller.rewrite)
    .put('/:id', auth, multerMiddleware, controller.update)
    .delete('/:id', auth, controller.delete)
    // .get('/refreshAccess', controller.login)

module.exports = router;