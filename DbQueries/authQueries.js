const express = require('express');
const {connectToDataBase,getDb} = require('../Db/MongoClient');
const { get } = require('../Routes/ProductRoutes');



const insertUser = async (userDetails)=>{
 await connectToDataBase();
 return getDb().collection('users').insertOne({username:userDetails.username,email:userDetails.email,phoneNumber:userDetails.phoneNumber,password:userDetails.hashedPassword,salt:userDetails.salt});
 
}

const insertLoggedInUser =async (email)=>{
    await connectToDataBase();
    return getDb().collection('usersLoggedIn').insertOne({email:email});
}
const CheckUniqueUserIndB = async (email) =>{

    await connectToDataBase();
    const result =  getDb().collection('users').findOne({email:email})
   return result
}


const loginCheckInDb = async(email, hashedPassword)=>{
    console.log(email,hashedPassword,"login check dekj ")
 await connectToDataBase();
 const result = getDb().collection('users').findOne({email:email,password:hashedPassword})
 return result 

}

const  findSaltByEmail = async (email) => {
await connectToDataBase();
const result =getDb().collection('users').findOne({email:email})

return result

}
 
const removeFromLoggedInUsers =async (email) =>{
    await connectToDataBase();
    const result = getDb().collection('usersLoggedIn').deleteOne({email:email})

    return result 
}
module.exports={insertUser ,CheckUniqueUserIndB,loginCheckInDb,findSaltByEmail,insertLoggedInUser,removeFromLoggedInUsers}