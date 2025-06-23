const {getUser} = require('../service/auth');

// Authentication:-
function checkForAuthentication(req,res,next){
  // const authorizationHeaderValue = req.headers['authorization'];
  // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
  //   return next(); 
  // }
  // const token = authorizationHeaderValue.split('Bearer ')[1];
  const tokenCookie = req.cookies?.uid;
  req.user = null;
  if(!tokenCookie) return next();
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}


// Authorization :-
function restrictTo(roles = []){
  return function(req,res,next){
    if(!req.user) return res.redirect('/login');
    if(!roles.includes(req.user.role)) return req.end("UnAuthorized!!");
    return next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo
}