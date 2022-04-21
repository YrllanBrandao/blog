const express = require("express");
const Connection = require("./database/connection.js");
const categoriesController = require("./categories/categories_controller.js");
const articlesController = require("./articles/articles_controller.js");
const articles = require("./articles/Article");
const Categories = require("./categories/Category")
const bodyParser = require("body-parser");
const app = new express();
const userController = require("./user/userController");
const session = require("express-session")
app.set("view engine", "ejs");
app.use(express.static('public'));



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());





app.get("/",(req,res)=>{

    articles.findAll({
    order:[["id", "DESC"]], limit:4
    }).then((article)=>{

        Categories.findAll().then((categories)=>{

            res.render("index",{
        
                articles: article,
                category: categories
        });

        })

    })
    

})


app.use(session({
    secret: "173w$#Yx2b)->98u$7e#Z4EY</]w3NuzNg;38D1XIxF4uR",
    cookie: {
        maxAge: 60000000
    }
}))
app.use("/", categoriesController);

app.use("/", articlesController);

app.use("/", userController)

//data bse

Connection.authenticate().then(()=>{
    console.log("banco de dados pronto")
})
    .catch((error)=>{
        console.log(error)
    })
app.listen(8080,()=>{

    console.log("the server is runnning")


})