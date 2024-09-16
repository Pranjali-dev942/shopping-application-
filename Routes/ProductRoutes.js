const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addToCart,
  removeFromCart,
  showCart,
  addNewProduct,
  updateProductQuantityInProducts
} = require("../Controllers/ProductController");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/addNewProduct", addNewProduct);

router.post("/updateProductQunatity", updateProductQuantityInProducts);

router.post("/cart/addToCart", addToCart);

router.post("/cart/removeFromCart", removeFromCart);

router.get("/cart/showCart", showCart);

module.exports = router;
