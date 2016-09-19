var express = require('express');
var passport = require('passport');
var User     = require('../models/user');

var usersRouter = express.Router();
require('../../config/passport')(passport);

usersRouter.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;

    res.json({ success: true, users: users });
  });
});

module.exports = usersRouter;