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

    getMe = (req, res, next) => {
        res
            .status(200)
            .send(req.login);
    }

    update = async(req, res, next) => {
        res.send(
            this.service.update({
                ...JSON.parse(req.body.data),
                avatar: req.file.path
            }, req.params.id)
        );
    }
    add = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.addUser({
                ...JSON.parse(req.body.data),
                avatar: req.file.path
            }));
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

    login = async(req, res) => {
        res.send(await this.service.login(req.body.login, req.body.password));
    }
}

module.exports = new UsersController();