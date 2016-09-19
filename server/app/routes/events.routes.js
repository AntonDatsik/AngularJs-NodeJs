var express = require('express');
var passport = require('passport');
var Event       = require('../models/event');

var eventsRouter = express.Router();
require('../../config/passport')(passport);

eventsRouter.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  var user = req.user;
  var newEvent = new Event({
    name: req.body.name,
    description: req.body.description,
    participants: [user._id]
  });

  newEvent.save(function(err, event) {
    if (err) {
      res.json({ success: false, msg: err });
    }

    res.json({success: true, event: event});
  });
});

eventsRouter.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  Event.find({}).populate('participants').exec(function(err, events) {
    if (err) throw err;

    res.json({ success: true, events: events });
  });
});

eventsRouter.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var id = req.params.id;
  Event.findById(id).populate('participants').exec(function(err, event) {
    if (err) {
      res.json({success: false, msg: err});
    }
    else {
      res.json({success: true, event: event});
    }

    
  });
});

eventsRouter.get('/add_user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var id = req.params.id;
  var user = req.user;
  Event.update({ _id: id }, { $addToSet: { participants: user._id } }, function(err, event) {
    if (err) {
      res.json({ success: false, msg: err });
    }

    Event.findById(id).populate('participants').exec(function(err, event) {
      if (err) {
        res.json({success: false, msg: err});
      }

      res.json({ success: true, event: event });
    });
  });
});

eventsRouter.get('/remove_user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var id = req.params.id;
  var user = req.user;
  Event.update({ _id: id }, { $pull: { participants: user._id } }, function(err, numAffected) {
    if (err) {
      res.json({ success: false, msg: err });
    }
    Event.findById(id).populate('participants').exec(function(err, event) {
      if (err) {
        res.json({success: false, msg: err});
      }

      res.json({ success: true, event: event });
    });
  });
});

module.exports = eventsRouter;