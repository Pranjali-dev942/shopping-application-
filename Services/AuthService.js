const express = require('express');
const { merge } = require('../Routes/ProductRoutes');
const router = express.Router();
const users = require('../Data/users.js');
const {
  insertUser, 
  CheckUniqueUserIndB,
  loginCheckInDb,
  findSaltByEmail,
  insertLoggedInUser,
  removeFromLoggedInUsers
} = require('../DbQueries/authQueries.js')
const {userSchema,validateUser} =require ('../Schema/authSchema.js')
const {hashing,salting,hashedString} =require ('../Hashing/authHashing.js')
class AuthService {
    LoginCheck = async(email, userInputPassword) => {
      console.log("login check fun ")
      const inputPwdHashing = hashing(userInputPassword)
      const userSaltCheck =  await findSaltByEmail(email)
      const saltFromDb = userSaltCheck.salt
      const hashedPwd =   hashedString(inputPwdHashing,saltFromDb)
      console.log(hashedPwd,"checking hassed pwd")
      console.log(saltFromDb,"db result relate salt ")

     const loginCheck1 = await loginCheckInDb(email, hashedPwd.finalresult)
     console.log("logincheck",loginCheck1)

     if (loginCheck1 == null){
       return false 
     }
     else {
      const userLog = await insertLoggedInUser (email)
      console.log(userLog,"userlog")
      return true
     }
  //   //   for (let i = 0; i < users.length; i++) {
  //   //   if (users[i].email == email && users[i].password == password) {
  //   //     return true;
  //   //   }
  //   // }
  //   // return false;
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
    // console .log(char,"auth char ")

    let message = "";

   try{ 
    if (username && email && phoneNumber && password) {
    // const uniqueUser = this.CheckUniqueUser(email);
     const uniqueUser= await CheckUniqueUserIndB(email)
     console.log("uniqueuser",uniqueUser)

    if (uniqueUser == null) {
       const pwdHashed =hashing(password)//113
      const salting1 =salting()//charrandom
     const result =   hashedString(pwdHashed,salting1)
     const hashedPassword = result.finalresult
     const salt = result.salt

       console.log(hashedPassword,"hashpassword")
      const userDetails = { username, email, phoneNumber, hashedPassword ,salt};

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

  UserLogin = async(email, password) => {
    let message = '';
    let status = 1;
 try {
   if (email && password) {
    console.log(email,password,"try ")
  const userLoginCheck = await this.LoginCheck(email, password);
  console.log(userLoginCheck,"userLoginCheck")
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

  UserLoggedOut = async(email)=>{
    let message = '';
    let status = 1;
    try{
      const emailVerify = await removeFromLoggedInUsers (email)
      console.log(emailVerify,'user logged out')
      status = 200;
      return  {status ,message}
    }
    catch(err){
      console.log(err)
      throw err
    }
  }
}

module.exports = AuthService;
