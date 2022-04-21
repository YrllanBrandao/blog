const Users = require("./user");
const express = require("express");
const { render } = require("express/lib/response");
const router = express.Router();
const bcrypt = require("bcryptjs")
const middleware = require("../middlewares/adminAuth")
const category = require("../categories/Category")
router.get("/admin/users", middleware,(req,res)=>{
    
    Users.findAll().then((users)=>{
        res.render("users/index",{
        users: users
        })
    })
})

router.get("/admin/users/create",middleware,(req,res)=>{

    res.render("users/register");
})




router.post("/admin/users/save",middleware,(req,res)=>{
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;


    Users.findOne({
        where:{
            email:email
        }
    }).then( account =>{

        if(account == undefined)
        {
            const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    Users.create({
        user: user,
        email: email,
        password: hash
    }).then(()=>{
        res.redirect("/admin/users");
    })
    .catch(erro =>{
        res.send("erro")
    })
        }
        else{
            res.redirect("/admin/users/create");
        }

    })
})

router.get("/login",(req,res)=>{

    category.findAll().then(categories =>{
        res.render("users/login",{
            category:categories
        })
    })

})

router.post("/authenticate",(req,res)=>{


    const  email = req.body.email;
    const password = req.body.password;

    Users.findOne({
        where:{
            email: email
        }
    }).then(user=>{
        if(user != undefined)
        {
            const  correct = bcrypt.compare(password, user.password);

            if(correct)
            {
                req.session.user = {
                    id: user.id,
                    user: user.user,

                }

                res.redirect("/admin/articles")
            }
            else{
                res.redirect("/login")
            }
        }
        else{
            res.redirect("/authenticate")
        }
    })


})

router.get("/logout",(req,res)=>{

    req.session.user = undefined;

    res.redirect("/login")
})

module.exports = router;