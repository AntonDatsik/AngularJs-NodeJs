var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var Event       = require('./app/models/event');
var port        = process.env.PORT || 3000;
var jwt         = require('jwt-simple');
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

checkToken = function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          res.json({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
  } else {
    res.json({success: false, msg: 'No token provided.'});
  }
}

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err, user) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.', userId: user._id});
    });
  }
});

apiRoutes.post('/signin', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          
          //TODO: add expired Date for this token
          var token = jwt.encode(user, config.secret);

          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, user: user });
        } else {
          res.json({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

apiRoutes.get('/checkToken', passport.authenticate('jwt', { session: false }), function(req, res) {
  checkToken(req);
  res.json({success: true, user: req.user});
});

apiRoutes.post('/events', passport.authenticate('jwt', { session: false }), function(req, res) {
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

apiRoutes.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;

    res.json({ success: true, users: users });
  });
});

apiRoutes.get('/events', passport.authenticate('jwt', { session: false }), function(req, res) {
  Event.find({}).populate('participants').exec(function(err, events) {
    if (err) throw err;

    res.json({ success: true, events: events });
  });
});

apiRoutes.get('/events/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
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

apiRoutes.get('/events/add_user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
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

apiRoutes.get('/events/remove_user/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
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

// connect the api routes under /api/*
app.use('/api', apiRoutes);
 
// Start the server
app.listen(port);