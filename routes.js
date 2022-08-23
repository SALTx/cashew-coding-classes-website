const express = require('express');
const router = express.Router();
const database = require("./database.js");
const password = "CashMoney";

database.connect();
router.use(express.urlencoded({ extended: true }));

router.get("/css/*", (req, res) => {
    res.sendFile(`${__dirname}/views/${req.url}`);
});
router.get("/js/*", (req, res) => {
    res.sendFile(`${__dirname}/views/${req.url}`);
});


router.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About"
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact"
    });
});

router.post("/contact", (req, res) => {
    database.addQuery(req.body, (e, query) => {
        if(e) { res.status(500).send({
            message: "Error adding query to database: " + e
        }); }
        else { res.status(200).send({
            message: "Query added successfully",
            query: query
        }); }
    });
});

router.get("/admin", (req, res) => {
    if(req.query.password == password) {
        database.getAllQueries((e, queries) => {
            res.render("admin", {
                title: "Admin",
                queries: queries
        }); });
    } else {
        res.render("login", {
            title: "Login"
        })
    }
});

router.get("/admin/delete/:id", (req, res) => {
    database.deleteQuery(req.params.id, (e, query) => {
        if(e) {
            res.redirect("/admin");
        } else {
            res.redirect("/admin?password=" + password);
        }
    })
})

module.exports = router;