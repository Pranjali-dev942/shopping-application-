
const express = require('express');

let products = [{id: "1", name: "Phone", quantity: 10, price:20000, description: "a good smartphone"},
    {id: "2", name: "laptop", quantity: 30, price:20000, description: "a good laptop"}];


let userCart = []


class ProductService {

 static GetAllProducts = ()=>{
    console.log(products);
    if(products.length > 0){
        return products;
    }
    return null;
 }  

 static GetProductById =(productId)=> {
    for(let i=0; i < products.length; i++)
        {
        if( products[i].id==productId){
          return products[i];
        }
       
     }  
     return null;
}
 

static CheckIfQuantityExists =(productArrayIdx,quantity) =>{
    if(products[productArrayIdx].quantity>=quantity){
      return true;
    }
    return false;
}

static IsValidId = (productId) => {
    let idFound = false;
    for(let i = 0; i< products.length; i++){
        if(products[i].id==productId){
            idFound = true;
        }
    }

    return idFound;
}
 
 static AddToCart = (productId, quantity)=>{

    let isValidString = "";

    if(!this.IsValidId(productId)){
        isValidString = "Invalid id";
        console.log(isValidString);
        return isValidString;
    }
    // console.log(products.length)
for(let i=0; i<products.length; i++){

    if(products[i].id==productId){
      
         let quantityPossible = this.CheckIfQuantityExists(i, quantity)
        //  console.log(quantityPossible,"quantity possible")
         if(quantityPossible){
            
            let productToBeAdded = { ...products[i] }             // the error was in this line, it was due to JS properties, this variable was referencing the same object in the memory rather than creating a shallow copy, now we fixed it with this line.
         
            products[i].quantity = products[i].quantity - quantity;
            // console.log(products,"product array ")
            if(products[i].quantity==0){
            products.splice(i,1)
            }
        let foundInUserCart = false;
            for(let j=0; j<userCart.length;j++){
                if(userCart[j].id==productId){
                    userCart[j].quantity=userCart[j].quantity + quantity
                    foundInUserCart=true;
                    break;
                }      
            }
            if(foundInUserCart==false){
                productToBeAdded.quantity=quantity;
                userCart.push(productToBeAdded);
                
            }
            break;
         }
       
    }  


   
}  
  
if(userCart.length>0){

    console.log('products:', products);
    console.log('userCart:', userCart);
    return {userCart,products}
}
return null
}

static ShowCart = ()=>{
    if(userCart.length > 0){
        return userCart;
    }
    return null;
 }  

}


module.exports = {ProductService, products};
