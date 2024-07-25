const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/producto.controller");
const router = Router();

router.get("/api/v1/product", getProducts);
router.post("/api/v1/product", createProduct);
router.put("/api/v1/product/:IdProducto", updateProduct);
router.delete("/api/v1/product/:IdProducto", deleteProduct);

module.exports = { router };
