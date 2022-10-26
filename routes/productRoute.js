import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controller/productController.js";
import isAuthenticated, { authorizeRoles } from "../middleWare/auth.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route('/product/:id').get(productDetails);
router.route('/review').put(isAuthenticated,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthenticated,deleteReview)

router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);


export default router;
