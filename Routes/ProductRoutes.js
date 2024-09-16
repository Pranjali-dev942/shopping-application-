const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  updateProduct,
  addToCart,
  removeFromCart,
  showCart,
  addNewProduct,
} = require("../Controllers/ProductController");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.post("/addNewProduct", addNewProduct);

router.post("/cart/addToCart", addToCart);

router.post("/cart/removeFromCart", removeFromCart);

router.get("/cart/showCart", showCart);

module.exports = router;
