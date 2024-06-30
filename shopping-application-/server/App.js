const express = require ('express');
const app = express();
const authController =require('./Controllers/AuthController')
const productController =require('./Controllers/ProductController')




const port = 8000

app.use(express.json())

app.use('/auth',authController)
app.use('/product',productController)

app.listen(port ,()=>{
console.log('listeninggggg')
})


