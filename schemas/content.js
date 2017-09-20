var mongoose = require("mongoose");

var ContentSchema = mongoose.Schema({
	title:String,
	detail:String,
	img:String
})

module.exports = ContentSchema