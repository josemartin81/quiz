//GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/creditos', {autor: 'Jose María Martín',
     foto: 'https://avatars1.githubusercontent.com/u/4822240?v=3&s=460'});
};


//GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

//GET /quizes/answer
exports.answer = function(req, res) {
  if (req.query.respuesta == 'Roma') {
      res.render('quizes/answer', {respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};
