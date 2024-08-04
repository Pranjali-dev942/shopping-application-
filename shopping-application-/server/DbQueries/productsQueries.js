const express = require('express');
 const {connectToDataBase,getDb} = require('../Db/MongoClient')


 const findAllProducts = async () =>{
    await connectToDataBase();
  return  getDb().collection('products').find().toArray()
 }


 const findProductById =(productId)=>{
    connectToDataBase();
    return getDb().collection('products').findOne({id:productId});
 }


   
 module.exports={findAllProducts,findProductById}