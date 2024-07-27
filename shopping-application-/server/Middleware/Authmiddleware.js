const express = require('express');
const router =express.Router();

const app = express ();


  generateTokendigit = ()=>{
//     let randomNumber = Math.random().toString
// console.log(randomNumber,"randome number")
let result ='';
for (let i =0; 1<10; i++){
     result += Math.floor(Math.random()*10);//math.random return value of 0 to 1 enke bich ka
}
console.log(result,"result")
return result

 }
   
 generateToken= (req,res,next)=>{
   const token = req.headers['authorization']

    if(token){
      next();
    }

 }

 router.post('/send',(req,res)=>{
   const {a} = req.body
   const token = generateTokendigit()
   res.setHeader['Authorization',token]
   res.status(200).json({message:"sent"})
 })
  


 router.get('/abc',generateToken,(req,res) => {
   console.log('coming abc ')
   //  const randomNumber1 = req.randomNumber
    res.status(200).json({message:"abced"})
    })


   

 module.exports = router;




