const express = require('express');
const { merge } = require('../Routes/ProductRoutes');
const router = express.Router();
const users = require('../Data/users.js');
const {insertUser,CheckUniqueUserIndB,} = require('../DbQueries/authQueries.js')
const {userSchema,validateUser} =require ('../Schema/authSchema.js')

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

  UserRegister = async (username, email, phoneNumber, password) => {
    let message = "";

   try{ 
    if (username && email && phoneNumber && password) {
    // const uniqueUser = this.CheckUniqueUser(email);
     const uniqueUser= await CheckUniqueUserIndB(email)
     console.log("uniqueuser",uniqueUser)

    if (uniqueUser == null) {

      const userDetails = { username, email, phoneNumber, password };
      const validation  = validateUser(userDetails)
      if (validation.valid== false){
        console.log(validation.error)
        throw new Error(validation.error)
      }
      // users.push(userDetails);
      await insertUser(userDetails)
      console.log("data inserted")
      message = 'register succesfully ';
    } else {
      message = 'email already available  ';
    }
  } else {
    message = 'please enter all the field ';
  }
  return  message ;
} catch(err){
console.log("error during user registration",err)
throw err
}
  }

  UserLogin = (email, password) => {
    let message = '';
    let status = 1;
 try { if (email && password) {
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
}
catch(err){
  console.log (err)
  throw err
}
  };
}

module.exports = AuthService;
