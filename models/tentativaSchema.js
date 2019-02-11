var mongoose = require('mongoose');

var tentativaSchema = mongoose.Schema({
	idUsuario: {type: String},
	idExercicio: {type: String},
	resposta: {type: String},
	
	tempo: {type: Number},
	dataInicial: {type: Date},
	
});

module.exports = mongoose.model('tentativa', tentativaSchema);