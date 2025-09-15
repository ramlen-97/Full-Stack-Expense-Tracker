const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been created");
    } catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;