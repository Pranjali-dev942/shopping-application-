const express = require('express');
const router = express.Router();
const ProductService = require('../Services/ProductService');






const getAllProducts =(req, res) => {
  const productAll = ProductService.GetAllProducts()
  console.log(productAll,"prof")
 if(productAll== null){
  return res.status(404).json({message:"There are no products"});
} 
else{
  return res.status(200).send(productAll);
  
}
  }  




const getProductById= (req, res) => {
  const desiredProduct = ProductService.GetProductById(req.params);
if(desiredProduct==null){
  return res.status(404).json({message:"desired product doesnt exist"});
} 
else{
  return res.status(200).send(desiredProduct);
}
}

const updateProduct = (req, res) => {

    
} 


const addTOcart=  (req, res ) => {
  const {id, quantity}=req.body

   const addToCartD=ProductService.AddToCart(id, quantity);
  
   console.log(addToCartD,"addto cart")

   if(addToCartD== null){
    return res.status(404).json({message:" not found"});

   }

     return res.status(200).send(addToCartD.userCart)

}

const showCart= (req, res) =>{
 const showCart= ProductService.ShowCart()
 if(showCart==null){
  return res.status(404).json({message:"not found"})
 }
return res.status(200).send(showCart)
 
}
module.exports = {getAllProducts,getProductById,updateProduct,addTOcart,showCart}