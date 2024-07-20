const express = require('express');
const app = express();
const authRoutes = require('./Routes/AuthRoutes');
const productRoutes = require('./Routes/ProductRoutes');

const port = 8000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`listeninggggg at port ${port}`);
  console.log(
    'Click on the link: ' + ` \x1b[36mhttp://localhost:${port}\x1b[0m`
  );
});
