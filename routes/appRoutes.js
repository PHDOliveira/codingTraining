var  express = require('express');
var router = express.Router();
var Country = require('../models/schemaDados');
var Exercicio = require('../models/exercicioSchema');
var Resposta = require('../models/respostaSchema');
var Tentativa = require('../models/tentativaSchema');
var User = require('../models/userSchema');
var Sandbox = require('../node_modules/sandbox/lib/sandbox');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const crypto = require("crypto");

router.use(passport.initialize());
router.use(passport.session());


router.post('/create',(req,res,next) => {
	var newCountry = new Country({
		name: req.body.name,
		capital: req.body.capital
	})
	newCountry.save((err,country)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		res.status(200).json({msg : country});
	});

	
});

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

router.get('/read',(req,res,next) => {
	Country.find({}, (err,countries)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		
		res.status(200).json(countries);
	});	
});

router.put('/update',(req,res,next) => {
	Country.findById(req.body._id, (err,country)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		country.name = req.body.name;
		country.capital = req.body.capital;
		country.save((err,country)=>{
			if(err) {
				res.status(500).json({errMsg: err})
			}	

			res.status(200).json({msg : country});
		})



	})

});

router.delete('/delete/:id',(req,res,next) => {
	Country.findOneAndRemove({ _id: req.params.id}, (err,country)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}	

		res.status(200).json({msg : country});
	})
});




router.post('/exercicio/create',(req,res,next) => {
	var newExercicio = new Exercicio({
		titulo: req.body.titulo,
		descricao: req.body.descricao,
		dicas: req.body.dicas,
		avaliador: req.body.avaliador,
		valorInicial: req.body.valorInicial,
		nivelDificuldade: 1500
	})
	newExercicio.save((err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		res.status(200).json({item});
	});

	
});


router.post('/create-user',(req,res,next) => {
	var newUser = new User({
		nome: req.body.nome,
		email: req.body.email,
		senha:  criptografar(req.body.senha), 
		nivel: 1500,
		permissions: ['aluno']
	})

	User.findOne({ "email": req.body.email }, (err, user)=> {
		if(!user){
			newUser.save((err,item)=>{
				if(err) {
					res.status(500).json({errMsg: err})
				}
				res.status(200).json({item});
			});		
		}else{
			res.status(500).json({errMsg: "usuario ja existe"})
		}
		
	});
});

router.post('/create-user-manual',(req,res,next) => {
	var newUser = new User({
		nome: req.body.nome,
		email: req.body.email,
		senha:  criptografar(req.body.senha), 
		nivel: 1500,
		permissions: req.body.permissoes
	})

	User.findOne({ "email": req.body.email }, (err, user)=> {
		if(!user){
			newUser.save((err,item)=>{
				if(err) {
					res.status(500).json({errMsg: err})
				}
				res.status(200).json({item});
			});		
		}else{
			res.status(500).json({errMsg: "usuario ja existe"})
		}
		
	});
});


router.get('/list-user',(req,res,next) => {
	User.find({}, (err,itens)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		var dadosUser = [];
		for(var i = 0, length1 = itens.length; i < length1; i++){
			var obj = {};
			obj.nome = itens[i].nome;
			obj.nivel = itens[i].nivel;
			obj.idUsuario = itens[i]._id;
			obj.senha = itens[i].senha;
			dadosUser.push(obj);
		}
		
		
		res.status(200).json(dadosUser);
	});	
});

router.put('/update-habilidade-user',(req,res,next) => {
	console.log(req.body);
	User.findById(req.body.idUsuario, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		item.nivel = req.body.nivel;
		
		item.save((err,item)=>{
			if(err) {
				res.status(500).json({errMsg: err})
			}	
			res.status(200).json({item});
		})



	})

});



router.delete('/delete-user/:id',(req,res,next) => {
	User.findOneAndRemove({ _id: req.params.id}, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}	

		res.status(200).json({item});
	})
});

router.get('/exercicio/read',(req,res,next) => {
	Exercicio.find({}, (err,itens)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		
		res.status(200).json(itens);
	});	
});

router.get('/server-time',(req,res,next) => {
	var d = new Date();
	res.status(200).json(d);
});

router.put('/exercicio/update',(req,res,next) => {
	Exercicio.findById(req.body._id, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		item.titulo = req.body.titulo;
		item.descricao = req.body.descricao;
		item.dicas = req.body.dicas;
		item.nivelDificuldade = req.body.nivelDificuldade;
		item.avaliador = req.body.avaliador;
		item.valorInicial = req.body.valorInicial;
		item.nivelDificuldade = req.body.nivelDificuldade;
		item.save((err,item)=>{
			if(err) {
				res.status(500).json({errMsg: err})
			}	

			res.status(200).json({item});
		})



	})

});

router.delete('/exercicio/delete/:id',(req,res,next) => {
	Exercicio.findOneAndRemove({ _id: req.params.id}, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}	

		res.status(200).json({item});
	})
});

router.delete('/resposta/delete/:id',(req,res,next) => {
	Resposta.findOneAndRemove({ _id: req.params.id}, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}	

		res.status(200).json({item});
	})
});


router.post('/resposta',(req,res,next) => {
	var newResposta = new Resposta({
		idUsuario: req.body.idUsuario,
		idExercicio: req.body.idExercicio,
		// resposta: req.body.resposta,
		// tempo: req.body.tempo,
		dataInicial: req.body.dataInicial,
		// dataFinal: req.body.dataFinal,
		// tentativas: req.body.tentativas,
		// listaErros: req.body.listaErros,
		// Ea: req.body.Ea,
		// Pt: req.body.Pt,
		// Ps: req.body.Ps,
		// Pm: req.body.Pm,
		// pontuacaoFinal: req.body.pontuacaoFinal,
	})
	newResposta.save((err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		res.status(200).json({item});
	});

	
});


router.post('/tentativa-intermediaria',(req,res,next) => {
	var newTentativa = new Tentativa({
		idUsuario: req.body.idUsuario,
		idExercicio: req.body.idExercicio,
		resposta: req.body.resposta,
		tempo: req.body.tempo,
		dataInicial: req.body.dataInicial,
		// dataFinal: req.body.dataFinal,
		// tentativas: req.body.tentativas,
		// listaErros: req.body.listaErros,
		// Ea: req.body.Ea,
		// Pt: req.body.Pt,
		// Ps: req.body.Ps,
		// Pm: req.body.Pm,
		// pontuacaoFinal: req.body.pontuacaoFinal,
	})
	newTentativa.save((err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		res.status(200).json({item});
	});

	
});

router.get('/ver-tentativas',(req,res,next) => {
	Tentativa.find({}, (err,itens)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		
		res.status(200).json(itens);
	});	
});


router.put('/resposta/update',(req,res,next) => {
	Resposta.findById(req.body._id, (err,item)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		item.resposta = req.body.resposta;
		item.tempo = req.body.tempo;
		item.dataInicial = req.body.dataInicial;
		item.dataFinal = req.body.dataFinal;
		item.tentativas = req.body.tentativas;
		item.listaErros = req.body.listaErros;
		item.Ea = req.body.Ea;
		item.Pt = req.body.Pt;
		item.Ps = req.body.Ps;
		item.Pm = req.body.Pm;
		item.pontuacaoFinal = req.body.pontuacaoFinal;
		
		item.save((err,item)=>{
			if(err) {
				res.status(500).json({errMsg: err})
			}	

			res.status(200).json({item});
		})



	})

});

router.post('/tentativa-resposta',(req,res,next) => {
	
	var s = new Sandbox();
	var resposta =  req.body.resposta;
	
	s.run(resposta, function(output) {
		res.status(200).json({output});
		return output;
	});

	// if(err) {
	// 	res.status(500).json({errMsg: err})
	// }

	

	
});

router.get('/ver-respostas',(req,res,next) => {
	Resposta.find({}, (err,itens)=>{
		if(err) {
			res.status(500).json({errMsg: err})
		}
		
		res.status(200).json(itens);
	});	
});


passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'senha'
},
function(username, password, done) {
	User.findOne({ "email": username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { "message": 'Incorrect username.' });
			
		}
		if (user.senha != password) {
			return done(null, false, { "message": 'Incorrect password.' });
		}
		console.log("aaaa3");
		return done(null, user);
	});
}
));




// router.post('/login',
// 	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
// 	});


router.post('/login',(req,res,next) => {
	User.findOne({ "email": req.body.login }, (err, user)=> {
		
		if(err) {
			res.status(500).json({errMsg: err})
		}
		console.log(user);
		console.log(req.body);

		if (!user) {
			res.status(500).json({errMsg: "Usuário não cadastrado!"})
			
		}		
		else if (user && user.senha != criptografar( req.body.senha)) {
			res.status(500).json({errMsg: "Senha incorreta!"})
		}
		else{
			var obj = {};
			obj.nome = user.nome;
			obj.email = user.email;
			obj.permissions = user.permissions;
			obj.nivel = user.nivel;
			obj.idUsuario = user._id;
			
			res.status(200).json({obj});	
		}
		
	});
});

// router.get('/list-user',(req,res,next) => {
// 	User.find({}, (err,itens)=>{
// 		if(err) {
// 			res.status(500).json({errMsg: err})
// 		}

// 		res.status(200).json(itens);
// 	});	
// });

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
};

function criptografar(senha) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};


module.exports = router;