const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost'
});

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User'
})

class DBUsersService {
    constructor() {
        (async () => {
            await sequelize.sync();
        })()
    }

    login = async(login, password) => {

        const user = await User.findOne({where: {login: login}});
        console.log(user.login);

        const check = await bcrypt.compare(password, user.password);

        if (check) {
            return jwt.sign({login}, 'secret');
            // const access = jwt.sign({login, type: 'access'}, 'secret', {expiresIn: 5 * 30});
            // const refresh = jwt.sign({login, type: 'refresh'}, 'secret', {expiresIn: '24h'});
            // return {
            //     access,
            //     refresh
        }
    }

    // refresh = (login) => {
    //     return {
    //         token: jwt.sign( {login, type: 'access'}, 'secret', {expiresIn: 5 * 30})
    //     }
    // }

     getUsers = async() => {
         return await User.findAll({
             raw: true
         });
    }

    getUserById = async(id) => {
        return await User.findOne({where: {id: id}})
    }

    update = async(dataToUpdate, id) => {
        // const oldAvatar = await User.findOne({where: {id: id}}).avatar;
        // fs.unlink(oldAvatar, (err) => {
        //     if (err) throw err;
        // });
        const data = {
            ...await User.findOne({where: {id: id}}),
            ...dataToUpdate
        }
        return await User.update(data,{where: {id: id}});
    }

    addUser = async(user) => {
        const pass = user.password;
        const login = user.login;
        const avatar = user.avatar;
        await bcrypt.hash(pass, 10, (err, hash) => {
            User.create({
                 login: login,
                 password: hash,
                 avatar: avatar
           })
        });
    }

    rewriteUsers = async(body, id) => {
        await User.update(body,{where: {id: id}});
    }

    deleteUser = async(id) => {
        const user = await User.findOne({where: {id: id}});
        await user.destroy()
    }
}

module.exports = new DBUsersService();