const Sequelize = require("sequelize");
const Connection = require("../database/connection.js");


const category = Connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})





module.exports = category;