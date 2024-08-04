const express = require("express");
const {MongoClient} = require ("mongodb");
const { connect } = require("../Routes/ProductRoutes");
let dbName = "shoppingApp"
const url ="mongodb://localhost:27017";
const mongoClient = new MongoClient(url,{useUnifiedTopology:true},{useNewUrlParser:true});//doubt
let dbInstence = null

 connectToDataBase = async ()=>{
try {   if(dbInstence != null){
    return dbInstence
   }
    await mongoClient.connect();
    dbInstence = mongoClient.db(dbName)
    console.log("connect with the mongoDB ")
}
catch(err){
    console.log("error",err)
    throw err
}
    
}

const getDb =()=>{
    try{ if(dbInstence != null){
        return dbInstence
       }}
       catch(err){
        console.log("error while fetching db",err)
        throw err
       }
   
}

module.exports = {connectToDataBase,getDb}