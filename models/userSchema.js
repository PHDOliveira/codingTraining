var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	nome: {type: String},
	email: {type: String},
	senha: {type: String},
	nivel: {type: Number},
	permissions : {type: Array}

});

module.exports = mongoose.model('user', userSchema);


