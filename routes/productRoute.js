import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
} from "../controller/productController.js";
import isAuthenticated, { authorizeRoles } from "../middleWare/auth.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router
  .route("/products/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(productDetails);

export default router;
