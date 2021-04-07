const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
  members: {
    type: [String] // store username of users
  }
	// possibly an optional password?
});


const RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;