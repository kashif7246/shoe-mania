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
  getAdminProducts,
} from "../controller/productController.js";
import isAuthenticated, { authorizeRoles } from "../middleWare/auth.js";
import multer from "../middleWare/multer.js";

const Uploades= multer.fields([{name:"image", maxCount:4},]);
const router = express.Router();
router.route("/products").get(getAllProducts);
router.route('/product/:id').get(productDetails);
router.route('/review').put(isAuthenticated,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthenticated,deleteReview)
//admin
router.route("/admin/products").get(isAuthenticated, authorizeRoles("admin"),getAdminProducts);
router
  .route("/admin/products/new")
  .post(Uploades,isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
