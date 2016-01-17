var express = require('express');
var router = express.Router();
//var passport = require('../auth/passport.js');
//var passport = require('passport');

/*Login page redirect.*/
router.get('/login', function (req, res, next) {
    res.render('loginPage', { title: 'LoginPage' });
})

/*GET home page.*/
router.get('/', function (req, res, next) {
    res.render('succcessPage', { title: 'Success Page' });
});

router.get('/index', function (req, res, next) {
    res.render('index', { title: 'LoginPage' });
})

module.exports = router;
