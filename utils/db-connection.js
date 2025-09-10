const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense-tracker','root','Ramlen@97',{
    dialect:'mysql',
    host:'localhost'
});

(async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection to db has been created");
    } catch (error) {
        console.log(error);
    }
})();

module.exports=sequelize;