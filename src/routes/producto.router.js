const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/producto.controller");
const authenticateToken = require("../middleware/auth.verify");
const router = Router();

router.get("/api/v1/product", getProducts);
router.post("/api/v1/product", createProduct);
router.put("/api/v1/product/:IdProducto", updateProduct);
router.delete("/api/v1/product/:IdProducto", deleteProduct);

router.get("/api/v2/product", authenticateToken, getProducts);
router.post("/api/v2/product", authenticateToken, createProduct);
router.put("/api/v2/product/:IdProducto", authenticateToken, updateProduct);
router.delete("/api/v2/product/:IdProducto", authenticateToken, deleteProduct);

module.exports = { router };
