import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUsers,
  resetPassword,
} from "../controller/userController.js";
const router = express.Router();
router.route("/register").post(registerUsers);
router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/forgot").post(forgotPassword);

router.route("/reset/:token").put(resetPassword);

export default router;
