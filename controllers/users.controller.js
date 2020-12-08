const usersService = require("../services/users.service");

class UsersController {
    constructor() {
        this.get = this.get.bind(this)
    }
    service = usersService;
    get (req, res, next) {
        res
            .status(200)
            .send(this.service.getUsers());
    }

    getUser = (req, res, next) => {
        res
            .status(200)
            .send(this.service.getUserById(req.params.id));
    }

    add = (req, res, next) => {
        res
            .status(201)
            .send(this.service.addUser(req.body));
    }

    rewrite = (req, res, next) => {
        res
            .status(201)
            .send(this.service.rewriteUsers(req.body, req.params.id));
    }

    delete = (req, res, next) => {
        res
            .status(201)
            .send(this.service.deleteUser(req.params.id));
    }
}

module.exports = new UsersController();