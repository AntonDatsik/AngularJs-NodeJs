var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	name: { type: String, require: true }, 
	description: String,
	participants: [{ 
		type: mongoose.Schema.Types.ObjectId,
  		ref: 'User' }],
  	createdAt: { type:Date, 'default': Date.now }
});

module.exports = mongoose.model('Event', eventSchema);