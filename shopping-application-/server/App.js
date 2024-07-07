const express = require ('express');
const app = express();
const authRoutes =require('./Routes/AuthRoutes')
const productRoutes =require('./Routes/ProductRoutes')





const port = 8000

app.use(express.json())

app.use('/auth',authRoutes)
app.use('/product',productRoutes)

app.listen(port ,()=>{
console.log('listeninggggg')
})


