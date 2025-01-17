var express = require("express");
var router = express.Router();
var Form = require("../models/form");
var jwt_decode = require("jwt-decode");
var User = require("../models/user");

router.get("/", async function (req, res, next) {
  var decoded = jwt_decode(req.headers.authorization.replace("Bearer ", ""));

  //retrive user obj from mongodb
  var user = await User.findOne({ email: decoded.email });
  user.getDeactivatedForms(function (err, deactivatedForms) {
    if (err) {
      console.log(err);
    } else {
      res.render("pages/archive", {
        title: "Archive",
        forms: deactivatedForms,
        emailtemplates: user.getDeactivatedEmailTemplates(),
        templates: user.getDeactivatedTemplates(),
      });
    }
  });
});

router.post("/restore-template", async function (req, res, next) {
  var decoded = jwt_decode(req.headers.authorization.replace("Bearer ", ""));

  //retrive user obj from mongodb
  var user = await User.findOne({ email: decoded.email });
  user.activateTemplate(req.body.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      user.getDeactivatedForms(function (err, deactivatedForms) {
        if (err) {
          console.log(err);
        } else {
          res.render("pages/archive", {
            title: "Archive Page",
            forms: deactivatedForms,
            emailtemplates: user.getDeactivatedEmailTemplates(),
            templates: user.getDeactivatedTemplates(),
          });
        }
      });
    }
  });
});

router.post("/restore-email-template", async function (req, res, next) {
  var decoded = jwt_decode(req.headers.authorization.replace("Bearer ", ""));

  //retrive user obj from mongodb
  var user = await User.findOne({ email: decoded.email });
  user.activateEmailTemplate(req.body.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      user.getDeactivatedForms(function (err, deactivatedForms) {
        if (err) {
          console.log(err);
        } else {
          res.render("pages/archive", {
            title: "Archive Page",
            forms: deactivatedForms,
            emailtemplates: user.getDeactivatedEmailTemplates(),
            templates: user.getDeactivatedTemplates(),
          });
        }
      });
    }
  });
});

module.exports = router;
