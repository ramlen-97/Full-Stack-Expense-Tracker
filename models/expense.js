const sequelize=require('../utils/db-connection');
const {DataTypes}=require('sequelize');

const Expense=sequelize.define('Expense',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports=Expense;