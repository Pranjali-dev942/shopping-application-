const express = require('express')


const hashing =(pwd)=>{

let hash = 0
const primeN =31 ;

for(let i =0 ;i<pwd.length ;i++){
  
 let asciiValue = pwd.charCodeAt(pwd[i])
 hash += (asciiValue * primeN)%256

}
let finalHash = hash.toString()
return finalHash
}

const salting =()=>{
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = chars.length;

    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result

}



  

  const hashedString= (result1,salt)=>{
  
     const finalresult = result1+salt
     console.log(finalresult)
     return {finalresult,salt}
  }

module.exports={hashing,salting,hashedString}