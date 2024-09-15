const mysql = require('mysql2')
const express = require("express");
let dbName = "shoppingApp"
const connection = mysql.createConnection({
    host : 'localhost',
    port:'3306',
    user:'root',
    password:'pranjali@123',
    database:dbName
})
 let dbInstence = null

connectToSqlDataBase = ()=>{
    try {   if(dbInstence != null){
        return dbInstence
       }
       connection.connect((err)=>{
        if(err){
            console.log(err,"error")
        }
        else{
            dbInstence = connection
        console.log("connected with the sqlDB ")
        }
       })
        
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
            console.log("error while fetching db from sql",err)
            throw err
           }
       
    }
    module.exports={connectToSqlDataBase,getDb}