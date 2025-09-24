const sequelize = require('../utils/db-connection');
const { DataTypes } = require('sequelize');

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    paymentSessionId: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    orderAmount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"Pending"
    }
})

module.exports = Payment;