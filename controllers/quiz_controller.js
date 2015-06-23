var models = require('../models/models.js');

//GET /quizes/creditos
exports.creditos = function(req, res) {
  res.render('quizes/creditos', {autor: 'Jose María Martín',
     foto: 'https://avatars1.githubusercontent.com/u/4822240?v=3&s=460'});
};


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(
      function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else { next(new Error('No existe quizId' + quizId));}
      }
    ).catch(function(error) {next(error);});
};


//GET /quizes
exports.index = function(req, res) {
  
  var cond = {};
  if (req.query.search) {
    var busq = req.query.search;
    busq = busq.replace(/\s+/g, '%');
    cond = {where: ["pregunta ilike ?",  '%' + busq + '%'], order: [["pregunta", 'ASC']]};
   };
   models.Quiz.findAll(cond).then(function(quizes) {
        res.render('quizes/index.ejs', {quizes: quizes})});
};


// GET /quizes/:id
exports.show = function(req, res) {
     res.render('quizes/show', {quiz: req.quiz});
};           

// GET /quizes/:id/answer
exports.answer = function(req, res) {
 var resultado = 'Incorrecto';
 if (req.query.respuesta && (req.query.respuesta.toLowerCase() == req.quiz.respuesta.toLowerCase())) {
   resultado = 'Correcto';
 }
 res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};