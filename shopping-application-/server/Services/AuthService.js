const express = require('express');
const { merge } = require('../Routes/ProductRoutes');
const router = express.Router();
const users = require('../Data/users.js');

class AuthService {
  static LoginCheck = (email, password) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email && users[i].password == password) {
        return true;
      }
    }
    return false;
  };
  static CheckUniqueUser = (emailCheck) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == emailCheck) {
        return false;
      }
    }
    return true;
  };

  UserRegister = (username, email, phoneNumber, password) => {
    if (username && email && phoneNumber && password) {
      const uniqueUser = this.CheckUniqueUser(email);
      let message = '';
      if (uniqueUser) {
        const userDetails = { username, email, phoneNumber, password };
        users.push(userDetails);
        message = 'register succesfully ';
      } else {
        message = 'email already available  ';
      }
    } else {
      message = 'please enter all the field ';
    }
  };

  UserLogin = (email, password) => {
    let message = '';
    let status = 1;
    if (email && password) {
      const userLoginCheck = this.LoginCheck(email, password);
      if (userLoginCheck) {
        status = 200;
        message = 'user login successfully';
      } else {
        status = 400;
        message = 'login failed try to signUp';
      }
    } else {
      status = 404;
      message = 'please enter all field';
    }
    return { status, message };
  };
}

module.exports = AuthService;
