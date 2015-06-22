var models = require('../models/models.js');

//GET /quizes/creditos
exports.creditos = function(req, res) {
  res.render('quizes/creditos', {autor: 'Jose María Martín',
     foto: 'https://avatars1.githubusercontent.com/u/4822240?v=3&s=460'});
};


//GET /quizes/question
exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', {pregunta: quiz[0].pregunta});  
  })
};

//GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta == quiz[0].respuesta) {
      res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }   
  })
};
