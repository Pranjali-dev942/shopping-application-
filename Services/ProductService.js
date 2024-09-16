const express = require('express');
// const products = require('../Data/products');
const {findAllProducts,findProductById,updateProductQuantity,findUsercartById,insertUsercart,updateCartQuantity,findAllProductInUsercart,addNewProductInProducts} = require('../DbQueries/productsQueries');
// const {findAllProducts,findAllProductsById}=require('../SQL/SqlQueries/ProductQueries')

const userCart = require('../Data/userCart');

class ProductService {
  static GetAllProducts = async () => {
    const result = await findAllProducts()
    console.log(result);
    if (result.length > 0) {
      return result;
    }
    return null;
  };

  // static GetAllProducts = async () => {
  //   const result =await findAllProducts()
  //   console.log(result);
  //   if (result.length > 0) {
  //     return result;
  //   }
  //   return null;
  // };
  // static GetProductById = (productId) => {
  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i].id == productId) {
  //       return products[i];
  //     }
  //   }
  //   return null;
  // };

static GetProductById = async (productId) => {
  const result = await findProductById(productId)
   console.log(result,"productID")
   return result
  };

  
  // static CheckIfQuantityExists = (arr, arrayIdx, quantity) => {
  //   if (arr[arrayIdx].quantity >= quantity) {
  //     return true;
  //   }
  //   return false;
  // };

  // static IsValidId = (arr, productId) => {
  //   let idFound = false;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].id == productId) {
  //       idFound = true;
  //     }
  //   }

  //   return idFound;
  // };

  static AddNewProduct = async(id, name, quantity, price, description) =>{
    let findIdInDB = await findProductById(id);
    if(findIdInDB == null){
      const result = await addNewProductInProducts(id,name,quantity,price,description);
      return result;
    }
    else{
      return "the id is already present";
    }
  }

  static AddToCart = async (productId, quantity) => {
    let isValidString = '';
   const result =  await findProductById(productId)
   
   console .log(result,"result of add to cart")
    // if (!this.IsValidId(products, productId)) {
    //   isValidString = 'Invalid id';
    //   console.log(isValidString);
    //   return isValidString;
    // }
    // console.log(products.length)
    if(result == null){
      isValidString = 'Invalid id';
        console.log(isValidString);
        return isValidString;
    }

    const quanitityByDb =result.quantity
    //product collection mein product id me jo saman hai uska quantity  => q -qdb
    //usercart mein check if id is present 
    //if it is then update quatity 
    //if its not then add in in usercart quantity 
    if (quanitityByDb >= quantity){
     const quantityUpdate=quanitityByDb-quantity
     const updateQuantity=await updateProductQuantity(productId,quantityUpdate)
     const usercartCheck =await findUsercartById(productId)
     const productToBeAdded = {...result}
     if(usercartCheck==null){
     productToBeAdded.quantity=quantity
     const addProductInCart = await insertUsercart (productToBeAdded) 
     }
    else{
     const updatedQuantityUsercart=usercartCheck.quantity+quantity
     updateCartQuantity(productId,updatedQuantityUsercart)
    }

    } 
     else{
      return "We don't have desired quantity";
     }
    // for (let i = 0; i < products.length; i++) {
    //   if (products[i].id == productId) {
    //     let quantityPossible = this.CheckIfQuantityExists(products, i, quantity);
    //     //  console.log(quantityPossible,"quantity possible")
    //     if (quantityPossible) {
    //       let productToBeAdded = { ...products[i] }; // the error was in this line, it was due to JS properties, this variable was referencing the same object in the memory rather than creating a shallow copy, now we fixed it with this line.

    //       products[i].quantity = products[i].quantity - quantity;
    //       // console.log(products,"product array ")
    //       /*
    //       if (products[i].quantity == 0) {
    //         products.splice(i, 1);                             // delete the product when quanitity = 0.
    //       }
    //       */

    //       let foundInUserCart = false;
    //       for (let j = 0; j < userCart.length; j++) {
    //         if (userCart[j].id == productId) {
    //           userCart[j].quantity = userCart[j].quantity + quantity;
    //           foundInUserCart = true;
    //           break;
    //         }
    //       }
    //       if (foundInUserCart == false) {
    //         productToBeAdded.quantity = quantity;
    //         userCart.push(productToBeAdded);
    //       }
    //       break;
    //     }
    //     else{
    //       return "We don't have desired quantity";
    //     }
    //   }
    // }

    // if (userCart.length > 0) {
    //   console.log('products:', products);
    //   console.log('userCart:', userCart);
    //   return { userCart, products };
    // }
    // return null;
    const userCart= await findAllProductInUsercart()
    const products =await findAllProducts()
    return {products,userCart}
  };


  // static RemoveFromCart = (productId, quantity) =>{
  //   if(!this.IsValidId(userCart, productId)){
  //       return "Product of this Id doesn't exist in Cart";
  //   }

  //   for(let idx = 0; idx < userCart.length; idx++){
  //     if(userCart[idx].id == productId){
  //       let quantityPossible = this.CheckIfQuantityExists(userCart, idx, quantity);
  //       if(quantityPossible){
    
  //         for(let i = 0; i< products.length; i++){
  //           if(products[i].id == productId){
  //             products[i].quantity += quantity;
  //             break;
  //           }
  //         }
      
  //         for(let i = 0; i<userCart.length; i++){
  //           if(userCart[i].id == productId){
  //             userCart[i].quantity -= quantity;
  //             break;
  //           }
  //         }
      
  //         return {userCart, products};
    
  //       }
  //       else{
  //         return "Don't have desired quantity in your cart";
  //       }
    
  //       }

  //     }
     
    
  //   return null;

    

  // }
//db interaction
  static RemoveFromCart = async (productId, quantity) =>{
  const productFromCart =  await findUsercartById(productId)
  if(findUsercartById == null){
    return "Product of this Id doesn't exist in Cart"
     }
  else{
   if(productFromCart.quantity<quantity){
    return "Don't have desired quantity in your cart"
    
   } 

   else{
    const quantityUpdateInCart =productFromCart.quantity-quantity
    const updateQuantityInCart = await updateCartQuantity(productId,quantityUpdateInCart)
    const product =await findProductById(productId)
    const quantityUpdateInProducts = product.quantity + quantity
    const  updateQuantityInProducts = await updateProductQuantity (productId,quantityUpdateInProducts)
    const userCart= await findAllProductInUsercart()
    const products =await findAllProducts()
    return {products,userCart}
     }
   }
  }

  

  static ShowCart = async () => {
    const userCart = await findAllProductInUsercart()
    if (userCart.length > 0) {
      return userCart;
    }
    return null;
  };
}

module.exports = { ProductService };
