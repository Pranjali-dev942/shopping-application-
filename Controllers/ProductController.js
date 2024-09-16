const express = require('express');
const router = express.Router();
const { ProductService } = require('../Services/ProductService');
const products = require('../Data/products');
const userCart = require('../Data/userCart');

// const getAllProducts = async (req, res) => {
//   const productAll =  await ProductService.GetAllProducts();
//   console.log(productAll, 'prof');
//   if (productAll == null) {
//     return res.status(404).json({ message: 'There are no products' });
//   } else {
//     return res.status(200).send(productAll);
//   }
// };

const getAllProducts =  async(req, res) => {
  const productAll =  await ProductService.GetAllProducts();
  console.log(productAll, 'prof');
  if (productAll == null) {
    return res.status(404).json({ message: 'There are no products' });
  } else {
    return res.status(200).send(productAll);
  }
};
const getProductById = async (req, res) => {
  const desiredProduct =  await ProductService.GetProductById(req.params);
  console.log(desiredProduct,"desiredproduct")
  if (desiredProduct == null) {
    return res.status(404).json({ message: "desired product doesn't exist" });
  } else {
    return res.status(200).send(desiredProduct);
  }
};

const addNewProduct = async(req, res) => {
  const { id, name, quantity, price, description } = req.body
  const addProductResult = await ProductService.AddNewProduct(id, name, quantity, price, description);
  if(addProductResult == "the id is already present"){
    return res.status(404).json({message:addProductResult});
  }
  return res.status(200).send(addProductResult);

}

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

const removeFromCart = async (req, res) =>{

  const { id, quantity } = req.body;
  const removeFromCartD = await ProductService.RemoveFromCart(id, quantity);
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
  addNewProduct
};