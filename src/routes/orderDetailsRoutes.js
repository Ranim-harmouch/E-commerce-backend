import express from "express";
import { addProductToOrder, getProductsByOrder } from "../controllers/orderdetailsController.js";

const router = express.Router();

router.post("/", addProductToOrder);
router.get("/order/:order_id", getProductsByOrder);

export default router;