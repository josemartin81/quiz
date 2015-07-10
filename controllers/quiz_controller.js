var models = require('../models/models.js');

//GET /quizes/creditos
exports.creditos = function(req, res) {
  res.render('quizes/creditos', {autor: 'Jose María Martín',
     foto: 'https://avatars1.githubusercontent.com/u/4822240?v=3&s=460',
	 errors: []});
};

//GET /quizes/statistics
exports.statistics = function(req, res) {
 
 models.Quiz.findAll({include: [models.Comment]}).then(
  function(quiz){
	  if (quiz) {
		  
		  //Calculamos estadísticas
		   var nCom=0;
		   var mediaCom = 0;
		   var sinCom=0;
		   var conCom=0;
		   var aux = 0;
		   
		   for (var i=0; i < quiz.length; i++) {
		     aux = quiz[i].Comments.length;	
		     nCom += aux
		     if (aux > 0) {
		        conCom++;
		     }
		   }
		   if (quiz.length > 0) { 
		   	mediaCom = nCom/quiz.length;
		   }
   
   	       sinCom = quiz.length - conCom; 
		  
		 	res.render('quizes/statistics.ejs',
			   {lonQuiz: quiz.length, nCom:nCom, mediaCom:mediaCom, sinCom:sinCom, conCom:conCom, errors: []});
	  }
 }); 
};


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
	  where: {id: Number(quizId)},
	  include: [{model: models.Comment}]
	}).then(
  function(quiz){
 	if(quiz) {
 		req.quiz = quiz;
 		next();
 	} else { next( new Error('No existe quizId=' + quizId));}
 	}
 	).catch(function(error){ next(error);}); 
};


//GET /quizes
exports.index = function(req, res) {
  
  var cond = {order: [["pregunta", 'ASC']]};
  if (req.query.search) {
    var busq = req.query.search;
    busq = busq.replace(/\s+/g, '%');
    cond = {where: ["pregunta ilike ?",  '%' + busq + '%'], order: [["pregunta", 'ASC']]};
   };
   models.Quiz.findAll(cond).then(function(quizes) {
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});});
};


// GET /quizes/:id
exports.show = function(req, res) {
     res.render('quizes/show', {quiz: req.quiz, errors: []});
};           

// GET /quizes/:id/answer
exports.answer = function(req, res) {
 var resultado = 'Incorrecto';
 if (req.query.respuesta && (req.query.respuesta.toLowerCase() == req.quiz.respuesta.toLowerCase())) {
   resultado = 'Correcto';
 }
 res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{pregunta:"Pregunta", respuesta: "Respuesta", tema:"Tema"}
	);
 	res.render('quizes/new', {quiz: quiz, errors:[]});
};

exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz);
 	quiz.validate().then(function(err){
 	    if (err) {      
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
 	  	} else {
 			quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
 	     		res.redirect('/quizes')});
 	     		}
 	     });
 };
 
exports.edit = function(req, res) {
	var quiz = req.quiz;
 	res.render('quizes/edit', {quiz: quiz, errors:[]});
};

exports.update = function(req, res) {
	
	req.quiz.pregunta= req.body.quiz.pregunta;
	req.quiz.respuesta= req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz.validate().then(function(err){
 	    if (err) {      
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
 	  	} else {
 			req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
 	     		res.redirect('/quizes')});
 	     		}
 	     });
 };
 
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});	
};