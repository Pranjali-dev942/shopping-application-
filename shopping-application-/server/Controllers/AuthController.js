const express = require('express');
const router = express.Router();

let users = [];


const CheckUniqueUser = (emailCheck)=>{
    for(let i=0; i<users.length;i++){
        if(users[i].email == emailCheck){
            return false;
        }
    }
     return true;
}

const LoginCheck =(email,password)=>{
    for(let i=0;i<users.length;i++){
        if(users[i].email==email && users[i].password==password){
            return true;
        }
    }
      return false;
}



router.post('/register', (req,res) =>{
    const {username, email, phoneNumber, password } = req.body;
    if(username && email && phoneNumber && password){
        const uniqueUser = CheckUniqueUser(email)
        if(uniqueUser){
            const userDetails = {username, email, phoneNumber, password };
            users.push(userDetails);
            return res.status(200).json({message:"user register successfully"});
        }
        else{
            return res.status(402).json({message:"Email already available"})
        }
    } 
     else{
        return res.status(400).json({message:"please enter all the field"});
     }


})


router.post('/login' , (req,res) =>{
  const {email, password}=req.body;
  if(email && password){
     const userLoginCheck =LoginCheck(email , password);
     if(userLoginCheck){
       return res.status(200).json({message:"user login successfully"});
 
     }
     else{
        return res.status(400).json({message:"login failed try to signUp"})
    }
    }
    else{
        return res.status(404).json({message:"please enter all the field"});
     }
  })



router.post('/logout',  (req,res) =>{


})

router.post('/deleteUser', (req,res) =>{
    const {email, password}=req.body;


})


module.exports = router;