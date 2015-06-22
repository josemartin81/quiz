var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
      {dialect: "sqlite", storage: "quiz.sqlite"}      
);

// Importar definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// exportar definición de tablas
exports.Quiz = Quiz; 

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
    if(count == 0) { // la tabla se inicializa solo si está vacía
      Quiz.create({pregunta: 'Capital de Italia',
                  respuesta: 'Roma'
                  })
      .sucess(function(){console.log('Base de datos inicializada')});
    };
  });  
});