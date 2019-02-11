var mongoose = require('mongoose');

var respostaSchema = mongoose.Schema({
	idUsuario: {type: String},
	idExercicio: {type: String},
	resposta: {type: String},
	listaErros: {type: String},
	tempo: {type: Number},
	tentativas: {type: Number},
	dataInicial: {type: Date},
	dataFinal: {type: Date},
	Ea: {type: Number},
	Pt: {type: Number},
	Ps: {type: Number},
	Pm: {type: Number},
	pontuacaoFinal: {type: Number}

});

module.exports = mongoose.model('resposta', respostaSchema);