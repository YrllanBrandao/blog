const { append } = require("express/lib/response");
const Sequelize = require("sequelize");
const Connection = require("../database/connection.js");
const category = require("../categories/Category.js")

const article = Connection.define("articles", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

article.belongsTo(category);//article pertence a categoria


category.hasMany(article)//tem muitos artigos


module.exports = article;