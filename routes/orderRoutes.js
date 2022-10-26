import express from "express";
import { 
    createOrder, 
    deleteOrder, 
    getAllOrders, 
    getSingleOrder, 
    myOrders, 
    updateOrder} from "../controller/orderController.js";
const router = express.Router();
import isAuthenticated, { authorizeRoles } from "../middleWare/auth.js";


router.route("/order/new").post(isAuthenticated,createOrder)
router.route("/orders/me").get(isAuthenticated,myOrders);
router.route("/order/:id").get(isAuthenticated,getSingleOrder)

router.route("/admin/orders").get(isAuthenticated,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id")
.put(isAuthenticated,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticated,authorizeRoles("admin"),deleteOrder)



export default router;