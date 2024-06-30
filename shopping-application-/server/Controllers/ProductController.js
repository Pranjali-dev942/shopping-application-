const express = require('express');
const router = express.Router();


let products = [{id: 1, name: "Phone", Quantiy: 80, price:20000, description: "a good smartphone"},
              {id: 2, name: "laptop", Quantiy: 30, price:20000, description: "a good laptop"}];


let userCart = []



router.get('/', (req, res) => {
    return res.status(200).send(products);
  
})

router.get('/:id' , (req, res) => {
    // const {id} = req.body
    for(let i=0; i < products.length; i++){
       if( products[i].id== req.params.id){
         return res.status(200).send(products[i])
       }
      
    }    
  return res.status(404).json({message: "Id not found "})

})

router.put( '/:id' ,(req, res) => {

    
} )


router.post('/addToCart', (req, res ) => {
     const{id} = req.body
     for( let i =0; i <products.length; i++){
        if(products[i].id=id){
            const myCart= products[i]
            userCart.push(myCart);
            return res.status(200).send(userCart);
        }
     }
     return res.status(404).json({message:" not found"});
})
module.exports = router;