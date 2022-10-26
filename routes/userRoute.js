import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUser,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUsers,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controller/userController.js";
import  isAuthenticated,{ authorizeRoles} from '../middleWare/auth.js'
const router = express.Router();
router.route("/register").post(registerUsers);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated,getUserDetails)
router.route("/password/update").put(isAuthenticated,updatePassword)
router.route("/me/update").put(isAuthenticated,updateProfile)

router
.route('/admin/users')
.get(isAuthenticated,authorizeRoles("admin"),getAllUser);
router
.route('/admin/user/:id')
.get(isAuthenticated,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticated,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticated,authorizeRoles("admin"),deleteUser)



export default router;
