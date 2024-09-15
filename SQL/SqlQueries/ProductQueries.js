const mysql = require('mysql2');
const { connectToSqlDataBase,getDb } = require('../SqlClient/SqlClient');

const findAllProducts =  async() =>{
    connectToSqlDataBase();
    const query = 'SELECT * FROM products'
  return  getDb().promise().query(query)
 }
 const findAllProductsById =  async(productId) =>{
    connectToSqlDataBase();
    const query = 'SELECT * FROM products WHERE id = ?'
  return  getDb().promise().query(query,[productId])
 }


 module.exports={findAllProducts,findAllProductsById}