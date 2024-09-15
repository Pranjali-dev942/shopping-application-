const express = require('express');
const router = express.Router();
const AuthService = require('../Services/AuthService');

const authService = new AuthService(); //we are creating obj, for using not static things

const register = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  const message =await authService.UserRegister(
    username,
    email,
    phoneNumber,
    password,
    
  );
  return res.status(200).json({ message: message });

};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, message } = await authService.UserLogin(email, password);
console.log(status,"controlle")
  return res.status(status).json({ message: message });
};

const logout = async (req, res) => {
  const {email} = req.body;
  const {status, message} =await authService.UserLoggedOut (email);
  console.log(status,"controlle")
  return res.status(status).json({ message: message });
};
const deleteUser = (req, res) => {
  const { email, password } = req.body;
};

const generateToken =(req,res) => {
  let token =""
  for(i=0;i<10;i++){
    const randomNumber = Math.floor(Math.random()*10);
     token += randomNumber
    // console.log(token,"token")


  }
  console.log(token,"final tokne")
  return res.send(token)
}

module.exports = { register, login, logout, deleteUser ,generateToken};
