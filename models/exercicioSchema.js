var mongoose = require('mongoose');

var exercicioSchema = mongoose.Schema({
	titulo: {type: String},
	descricao: {type: String},
	dicas: {type: String},
	nivelDificuldade: {type: Number},
	avaliador: {type: String},
	valorInicial: {type: String}
});

module.exports = mongoose.model('exercicio', exercicioSchema);