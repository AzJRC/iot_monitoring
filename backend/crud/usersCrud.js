const { where } = require('sequelize');
const { UsersModel } = require('../model/Models')

module.exports.getUser = (username) => {
    return UsersModel.findOne({ where: { username: username } });
}

module.exports.updateUserRefreshToken = (refreshToken, username) => {
    return UsersModel.update({ refreshToken: refreshToken }, { where: { username: username } });
}