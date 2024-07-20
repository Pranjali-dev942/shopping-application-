const express = require('express');
const products = require('../Data/products');
const userCart = require('../Data/userCart');

class ProductService {
  static GetAllProducts = () => {
    console.log(products);
    if (products.length > 0) {
      return products;
    }
    return null;
  };

  static GetProductById = (productId) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == productId) {
        return products[i];
      }
    }
    return null;
  };

  static CheckIfQuantityExists = (arr, arrayIdx, quantity) => {
    if (arr[arrayIdx].quantity >= quantity) {
      return true;
    }
    return false;
  };

  static IsValidId = (arr, productId) => {
    let idFound = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == productId) {
        idFound = true;
      }
    }

    return idFound;
  };

  static AddToCart = (productId, quantity) => {
    let isValidString = '';

    if (!this.IsValidId(products, productId)) {
      isValidString = 'Invalid id';
      console.log(isValidString);
      return isValidString;
    }
    // console.log(products.length)
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == productId) {
        let quantityPossible = this.CheckIfQuantityExists(products, i, quantity);
        //  console.log(quantityPossible,"quantity possible")
        if (quantityPossible) {
          let productToBeAdded = { ...products[i] }; // the error was in this line, it was due to JS properties, this variable was referencing the same object in the memory rather than creating a shallow copy, now we fixed it with this line.

          products[i].quantity = products[i].quantity - quantity;
          // console.log(products,"product array ")
          /*
          if (products[i].quantity == 0) {
            products.splice(i, 1);                             // delete the product when quanitity = 0.
          }
          */

          let foundInUserCart = false;
          for (let j = 0; j < userCart.length; j++) {
            if (userCart[j].id == productId) {
              userCart[j].quantity = userCart[j].quantity + quantity;
              foundInUserCart = true;
              break;
            }
          }
          if (foundInUserCart == false) {
            productToBeAdded.quantity = quantity;
            userCart.push(productToBeAdded);
          }
          break;
        }
        else{
          return "We don't have desired quantity";
        }
      }
    }

    if (userCart.length > 0) {
      console.log('products:', products);
      console.log('userCart:', userCart);
      return { userCart, products };
    }
    return null;
  };


  static RemoveFromCart = (productId, quantity) =>{
    if(!this.IsValidId(userCart, productId)){
        return "Product of this Id doesn't exist in Cart";
    }

    for(let idx = 0; idx < userCart.length; idx++){
      if(userCart[idx].id == productId){
        let quantityPossible = this.CheckIfQuantityExists(userCart, idx, quantity);
        if(quantityPossible){
    
          for(let i = 0; i< products.length; i++){
            if(products[i].id == productId){
              products[i].quantity += quantity;
              break;
            }
          }
      
          for(let i = 0; i<userCart.length; i++){
            if(userCart[i].id == productId){
              userCart[i].quantity -= quantity;
              break;
            }
          }
      
          return {userCart, products};
    
        }
        else{
          return "Don't have desired quantity in your cart";
        }
    
        }

      }
     
    
    return null;

    

  }

  static ShowCart = () => {
    if (userCart.length > 0) {
      return userCart;
    }
    return null;
  };
}

module.exports = { ProductService };
