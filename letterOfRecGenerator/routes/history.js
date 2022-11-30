var express = require('express');
var router = express.Router();
var Form = require('../models/form');

/* GET Templates page. */
router.get('/', function (req, res, next) {
if (!req.user) {
    res.render('views/pages/history', {
        title: req.query.email,
        emailHistory: req.user.getEmailHistory(),
        id: req.query.id,
    });
}
res.render("pages/profile", {
    title: "Profile",
  });
});

module.exports = router;