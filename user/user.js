
const Connection = require("../database/connection");
const Sequelize = require("sequelize")


const user = Connection.define("users",{
    user:{
        type:Sequelize.STRING,
        allowNull: false
    } ,
    email:{
        type:  Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }

})




module.exports = user;