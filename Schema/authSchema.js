const express = require('express')
const userSchema = {
 username:"string",
 email:"string",
 phoneNumber:"number",
 hashedPassword:"string",
 salt:"string"
}


const validateUser = (userDetails)=>{
 for(const key in userSchema ){
    if (userDetails[key]==null ){
     return {valid:false,error: `Missing property ${key}`}      
    }
    
    }
    if(userSchema.length != userDetails.length){
    return{valid:false ,error:"somthing is extra"}
    }
    for(const key in userSchema ){
        if (typeof userDetails[key]   != userSchema[key]){
         return {valid:false,error: `invalid type ${key}`}      
        }
        
  
 } 

return {valid:true}
}
 

module.exports ={userSchema,validateUser}