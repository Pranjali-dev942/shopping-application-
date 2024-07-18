const express =require('express')
const router =express.Router()
const {getAllProducts,getProductById,updateProduct,addToCart,showCart} =require('../Controllers/ProductController')



router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.post('/cart/addToCart', addToCart);

router.get('/cart/showCart', showCart);

module.exports=router;