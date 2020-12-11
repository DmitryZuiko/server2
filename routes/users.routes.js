const express = require('express');
const router = express.Router();

// const logPath = require("../middlewares/log-path.middleware");
const controller = require("../controllers/users.controller");

router
    .get('/', controller.get)
    .get('/:id', controller.getUser)
    .post('/', controller.add)
    .put('/:id', controller.rewrite)
    .delete('/:id', controller.delete)

module.exports = router;