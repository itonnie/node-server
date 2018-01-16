var express = require("express");
var session = require("express-session");
var User = require("../models/users");
var router = express.Router();

router.get("/login", (req, res, next) => {
    res.render("login", {
        title: "Login"
    });
});

router.post("/login", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username , password: password }, (err, result) => {
        if(err) throw err;
        else if(result == null) {
            res.json({
                ok: false,
                message: "Wrong username and password combination"
            });
        } else {
            var thisuser = {
                username: result.username,
                password: result.password
            };
            req.session.user = thisuser;
            res.json({
                ok: true,
                data: result
            });
        }
    });

});

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, (err, result) => {
        if(err) throw err;
        else if(result == null) {
            //save user
            var newuser = new User({
                username: username,
                password: password
            });

            var thisuser = {
                username: username,
                password: password
            }

            req.session.user = thisuser;

            newuser.save((err, userdata) => {
                if(err) throw err;
                else {
                    res.json({
                        ok: true,
                        data: userdata
                    });
                }
            });
        } else {
            res.json({
                ok: false,
                message: "Username taken, login or choose another username."
            })
        }
    });
})

module.exports = router;