const express = require('express');
const router = express.Router();
const { ProductService } = require('../Services/ProductService');
const products = require('../Data/products');
const userCart = require('../Data/userCart');

const getAllProducts = (req, res) => {
  const productAll = ProductService.GetAllProducts();
  console.log(productAll, 'prof');
  if (productAll == null) {
    return res.status(404).json({ message: 'There are no products' });
  } else {
    return res.status(200).send(productAll);
  }
};

const getProductById = (req, res) => {
  const desiredProduct = ProductService.GetProductById(req.params);
  if (desiredProduct == null) {
    return res.status(404).json({ message: "desired product doesn't exist" });
  } else {
    return res.status(200).send(desiredProduct);
  }
};

const updateProduct = (req, res) => {};

const addToCart = (req, res) => {
  const { id, quantity } = req.body;

  const addToCartD = ProductService.AddToCart(id, quantity);

  if (addToCartD == null) {
    return res.status(404).json({ message: ' not found' });
  } else if (addToCartD == 'Invalid id') {
    return res.status(200).json({ message: " Product doesn't exists" });
  } 
  else if(addToCartD == "We don't have desired quantity"){
    return res.status(200).json({message: "Desired quantity does not exist! Please select less quanitity"})
  }
  else {
    return res.status(200).send(addToCartD.userCart);
  }
};

const removeFromCart = (req, res) =>{

  const { id, quantity } = req.body;
  const removeFromCartD = ProductService.RemoveFromCart(id, quantity);
  if(removeFromCartD == "Product of this Id doesn't exist in Cart"){
    return res.status(200).json({message: "Product of this Id doesn't exist in Cart'"});
  }
  else if(removeFromCartD == "Don't have desired quantity in your cart"){
    return res.status(200).json({message: "Don't have desired quantity in your cart'"});
  }
  else{
    return res.status(200).send(removeFromCartD.userCart);
  }
  
}

const showCart = (req, res) => {
  const cartPrdocuts = ProductService.ShowCart();
  if (cartPrdocuts == null) {
    return res.status(200).json({ message: 'Cart is empty' });
  }
  return res.status(200).send(showCart);
};
module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  addToCart,
  removeFromCart,
  showCart,
};
