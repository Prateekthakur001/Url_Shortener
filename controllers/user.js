const User = require('../models/user');
const {v4 : uuidv4} = require('uuid');
const {setUser} = require('../service/auth');

// SignUp :-
async function handleUserSignup(req,res) {
  const {name,email,password} = req.body; 
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');
}

// Login :-
async function handleUserLogin(req,res) {
  const {email,password} = req.body; 
  const user = await User.findOne({
    email,
    password
  });

  if(!user) return res.render('login',{
    error: 'Invalid email or password!!'
  });

  const token = setUser(user);
  res.cookie('uid',token); // first parameter is name of the cookie and second parameter is token that we are sending.
  return res.redirect('/');
  // return res.json({ token });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
}