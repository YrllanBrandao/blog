const express = require("express");
const { default: slugify } = require("slugify");
const articles = require("./Article");
const Categories = require("../categories/Category");
const category = require("../categories/Category");
const middleware = require("../middlewares/adminAuth")

const router = express.Router();


router.get("/admin/articles", middleware,(req,res)=>{
    
    articles.findAll({
        include:[{
            model: Categories,
            required: true
        }]
    }).then((article)=>{

        res.render("admin/articles/index",{
            articles: article,
            
        })

    })
})

router.get("/admin/articles/new", middleware, (req,res)=>{
    Categories.findAll().then((categories)=>{
        res.render("admin/articles/new",{
            categories:categories
        });

    })
    
})
router.post("/admin/articles/delete/", middleware, (req,res)=>{

    const id = req.body.id;

    articles.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles");
    })
    


})
router.post("/admin/articles/save", middleware,(req,res)=>{

    const article = req.body.body;
    const title = req.body.title;
    const category = req.body.category;
    articles.create({
        title: title,
        body: article,
        slug: slugify(title),
        categoryId: category
    }).then(()=>{
        res.redirect("/admin/articles",)
    })
    


})
router.get("/admin/articles/edit/:id",middleware,(req,res)=>{
    
    const id = req.params.id;

    articles.findOne({
        where:{
            id: id
        }
    }).then((article)=>{

        res.render("admin/articles/editArticle",{
            article: article
        })
    })



})
router.post("/admin/articles/update",middleware,(req,res)=>{

    const title = req.body.title;
    const body = req.body.body;
    const id = req.body.id;

    articles.update({
        title: title,
        body: body,
        slug: slugify(title)

    }, {
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})
router.get("/articles/:slug",(req,res)=>{

    const slug = req.params.slug;

    articles.findOne({
        where:{
            slug:slug
        }
    }).then((article)=>{
        if(article != undefined)
        {
            Categories.findAll().then((category)=>{

                res.render("article",{
                    article: article,
                    category: category
                })

            })
        }
        else{
            res.redirect('/')
        }
    })


})

router.get("/articles/page/:num", (req,res)=>{
    const page = req.params.num;
    let offset = 0;


    if(isNaN(page) || page == 1)
    {
        offset = 0;
    }
    else{
        offset = (Number(page)-1)*4;
    }
    articles.findAndCountAll({
        limit: 4,
        offset: offset
    }).then((article)=>{
        let next;

        if(offset+3 >= article.count)
        {
            next = false;
        }
        else{
            next = true;
        }
       let result = {
           article: article,
           next : next
       }

       category.findAll().then((categoria)=>{
        res.render("admin/articles/page",{
            result: result,
            category: categoria,
            page: Number(page)
        })
 
       })
    })


})
module.exports = router;