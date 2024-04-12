const { UsersModel, DevicesModel } = require("./../model/Models")

module.exports.createUserTable = async () => {
    await UsersModel.sync()
    const defaultAdminUser = await UsersModel.findOne({ where: { username: 'admin' } });
    if (!defaultAdminUser) {
        await UsersModel.create({
            username: 'admin',
            password: 'admin',
            role: 'administrator'
        });
        console.log('Default admin user created.');
    }
}

module.exports.createDevicesTable = async () => {
    await DevicesModel.sync()
}
