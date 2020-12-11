const usersService = require("../services/users.service");
const dbUsersService = require("../services/db.users.service");

class UsersController {
    service = dbUsersService;

    get = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.getUsers());
    }

    getUser = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.getUserById(req.params.id));
    }

    add = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.addUser(req.body));
    }

    rewrite = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.rewriteUsers(req.body, req.params.id));
    }

    delete = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.deleteUser(req.params.id));
    }
}

module.exports = new UsersController();