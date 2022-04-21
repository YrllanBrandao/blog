const express = require("express");
const connection = require("../database/connection");
const category = require("./Category.js");
const router = express.Router();
const slugify = require("slugify");
const articles = require("../articles/Article");
const middleware = require("../middlewares/adminAuth")
router.get('/admin/categories/new',(req,res)=>{

    res.render("admin/categories/new")

})


router.post("/categories/save", middleware, (req, res)=>{


    const title = req.body.title;
    
        category.create({
            title: title,
            slug: slugify(`${title}`)
        }).then(()=>{
            res.redirect("/admin/categories");
        })
        .catch(error =>{
            res.send("vazio")
        })
     
    
})
router.get("/admin/categories", middleware,(req, res)=>{


    category.findAll().then(
        (categories)=>{
            res.render("admin/categories/categories",{
                categories: categories
            })
           
        }
    );

})
router.post("/admin/categories/delete", middleware,(req,res)=>{


    const id = req.body.id;

    category.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    })



});

router.get("/admin/categories/edit/:id",middleware,(req,res)=>{

    const id = req.params.id;


        if(!isNaN(id))
        {
    category.findByPk(id).then( category =>{

        res.render("edit",{
            category: category
        })
                                     })
                                     .catch(()=>{

        res.redirect("/admin/categories")
    })
    
        }
        else{
    res.redirect("/admin/categories")
}
   

    })
    

router.post("/categories/update",middleware,(req,res)=>{

    const id = req.body.id;
    const title = req.body.title;
    category.update({
        title:title,
        slug: slugify(title)
    },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    })

})


router.get("/categories/:slug",(req,res)=>{

    const slug = req.params.slug;

   
    category.findOne({
        where:{
            slug: slug
        },
        include:[{model: articles}]
    }).then((category_)=>{
        if(category_ != undefined)
        {
            category.findAll().then((categorias)=>{
                res.render("filter", {
                    categoryFilter: category_.articles,
                    category: categorias
                })
            })
        }
        else{
            res.redirect("/");
        }
    })
})

module.exports = router;