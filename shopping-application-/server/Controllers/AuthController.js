const express = require('express');
const router = express.Router();
const AuthService = require('../Services/AuthService');


const authService = new AuthService();//we are creating obj, for using not static things

const register= (req,res) =>{
    const {username, email, phoneNumber, password } = req.body;
  const message =authService.UserRegister(username, email, phoneNumber, password);
return res.status(200).json({message :message })

}


const login = (req,res) =>{
  const {email, password}=req.body;
  const  {status,message}=authService.UserLogin(email,password)

  return res.status(status).json({message :message })

  }


  const logout=  (req,res) =>{


}
const deleteUser= (req,res) =>{
    const {email, password}=req.body;


}


module.exports ={register,login,logout,deleteUser} ;