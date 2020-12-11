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
    name: {
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

     getUsers = async() => {
         return await User.findAll({
             raw: true
         });
    }

    getUserById = async(id) => {
        return await User.findOne({where: {id: id}})
    }

    addUser = async(user) => {
        await User.create(user);
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