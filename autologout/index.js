var maxTime = 2 * 60 * 1000; // 2 minutos máximo inactivo 

module.exports = function() {

  return function(req, res, next) {
    //recuperamos la hora actual y la última guardada en la sesión
    var nowTime = new Date().getTime();
    var lastReqTime = req.session.reqTime || nowTime;

    //si hay usuario registrado y se supera el tiempo máximo cerramos sesión
    if (req.session.user && ((nowTime - lastReqTime) > maxTime)) {
      delete req.session.user;
      req.session.errors = [{"message": 'Se ha cerrado la sesión por inactividad'}];
    }

    req.session.reqTime = nowTime;
    next();
  };
};