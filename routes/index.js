var express = require('express');
var Contact = require('../models/contact');
var router = express.Router();

/* GET home page. */
router.get('/', verifySession, function(req, res, next) {
  res.render('index', { title: 'Contact Book' });
});

router.get("/contacts/:holder", (req, res, next) => {
  var holder = req.params.holder;

  Contact.find({ holder: holder }, (err, contacts) => {
    if(err) throw err;
    else {
      res.json({
        ok: true,
        data: contacts
      });
    }
  });
});

router.post("/addcontact", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  var holder = req.body.holder;

  var newContact = new Contact({
    name: name,
    email: email,
    number: number,
    holder: holder
  });

  newContact.save((err, result) => {
    if(err) throw err;
    else {
      Contact.find((error, response) => {
        if(error) throw error;
        else {
          res.json({
            ok: true,
            data: response
          });
        }
      });
    }
  });
});

router.post("/deletecontact", (req, res, next) => {
  var id = req.body.id;

  Contact.findOneAndRemove({ _id: id }, (err, result) => {
    if(err) throw err;
    else {
      Contact.find((error, contacts) => {
        if(error) throw error;
        else {
          res.json({
            ok: true,
            data: contacts
          });
        }
      })
    }
  });
});

function verifySession(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.render("login", {
      title: "Login",
      message: "You have to login first!"
    });
  }
}

module.exports = router;
