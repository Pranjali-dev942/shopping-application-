const express =require('express')
const router =express.Router()
const {getAllProducts,getProductById,updateProduct,addTOcart,showCart} =require('../Controllers/ProductController')



router.get('/',getAllProducts)

router.get('/:id',getProductById)

        
router.put( '/:id' ,updateProduct)
    
router.post('/addToCart',addTOcart)

    router.get('/showcart',showCart)

    module.exports=router;