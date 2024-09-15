const express = require ('express');
const app = express();
const authRoutes = require('./Routes/AuthRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const {connectToDataBase} = require('../server/Db/MongoClient');

const port = 8000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
 
connectToDbAndServer = async()=>{
  try {
    const db = await connectToDataBase()
    app.listen(port, () => {
      console.log(`listeninggggg at port ${port}`);
      console.log(
        'Click on the link: ' + ` \x1b[36mhttp://localhost:${port}\x1b[0m`
      );
    });
  }
catch(error){
  console.log ("error while connecting to db or server",error)
  throw error
}

}

// connectToDbAndServerBySql = async()=>{
//   try {
//     const sqlDb =  connectToSqlDataBase()
//     app.listen(port, () => {
//       console.log(`listeninggggg at port ${port}`);
//       console.log(
//         'Click on the link: ' + ` \x1b[36mhttp://localhost:${port}\x1b[0m`
//       );
//     });
//   }
// catch(error){
//   console.log ("error while connecting to db or server in mysql",error)
//   throw error
// }

// }
 connectToDbAndServer();
// connectToDbAndServerBySql();




 
    // const db = await mongoClient()
    // app.listen(port, () => {
    //   console.log(`listeninggggg at port ${port}`);
    //   console.log(
    //     'Click on the link: ' + ` \x1b[36mhttp://localhost:${port}\x1b[0m`
    //   );
    // });
 


