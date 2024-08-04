const express = require('express');
const {connectToDataBase,getDb} = require('../Db/MongoClient')



const insertUser = async (userDetails)=>{
 await connectToDataBase();
 return getDb().collection('users').insertOne({username:userDetails.username,email:userDetails.email,phoneNumber:userDetails.phoneNumber,password:userDetails.password});
 
}

const CheckUniqueUserIndB = async (email) =>{

    await connectToDataBase();
    const result =  getDb().collection('users').findOne({email:email})
   return result
}

module.exports={insertUser ,CheckUniqueUserIndB}