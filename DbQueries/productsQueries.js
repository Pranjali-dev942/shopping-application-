const express = require('express');
 const {connectToDataBase,getDb} = require('../Db/MongoClient');
const { products } = require('../Data/products');
const userCart = require('../Data/userCart');


 const findAllProducts = async () =>{
    await connectToDataBase();
  return  getDb().collection('products').find().toArray()
 }


 const findProductById =async(productId)=>{
    await connectToDataBase();
    return getDb().collection('products').findOne({id:productId});
 }

 const findUsercartById =async(productId)=>{
   await connectToDataBase();
   return getDb().collection('usercart').findOne({id:productId});
}
 const updateProductQuantity =async (productId,quantity)=>{
   await connectToDataBase();
   return getDb().collection('products').updateOne({id:productId},{$set:{quantity:quantity}})
 }


 const insertUsercart =async(userCartProduct)=>{
   await connectToDataBase();
   return getDb().collection('userCart').insertOne({id:userCartProduct.id,name:userCartProduct.name,quantity:userCartProduct.quantity,price:userCartProduct.price,description:userCartProduct.description})

 }


 const updateCartQuantity =async (productId,quantity)=>{
   await connectToDataBase();
   return getDb().collection('userCart').updateOne({id:productId},{$set:{quantity:quantity}})
 }


 const findAllProductInUsercart = async () =>{
  await connectToDataBase ();
  return getDb().collection('userCart').findOne().toArray()
 }
//  const findProductByQuantity = async (productId)=>{
//    await connectToDataBase ();
//    result =getDb().collection('products')
//  }
   
 module.exports={findAllProducts,findProductById,updateProductQuantity,findUsercartById,insertUsercart,updateCartQuantity ,findAllProductInUsercart}