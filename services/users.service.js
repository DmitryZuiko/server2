const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const filePath = path.parse(__dirname).dir + '/users.json';

class UsersService {
    constructor() {
        this.usersList = []

        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) return err

            this.usersList = JSON.parse(content);
        })
    }

    saveData = () => {
        fs.writeFile(filePath, JSON.stringify(this.usersList), (err) => {
            if (err) return err
        })
    }

    getUsers = () => {
        return this.usersList;
    }

    getUserById = (id) => {
        return this.usersList.filter( (user) => user.id === id )[0]
    }

    addUser = (user) => {
        user.id = uuid.v4();
        this.usersList.push(user);
        this.saveData();
        return this.usersList;
    }

    rewriteUsers = (body, id) => {
        this.usersList.forEach(user => {
            if(user.id === id) {
                user.name = body.name;
            }
        })
        this.saveData();
        return this.usersList;
    }

    deleteUser = (id) => {
        this.usersList = this.usersList.filter( (user) => user.id !== id )
        this.saveData();
        return this.usersList;
    }
}

module.exports = new UsersService();