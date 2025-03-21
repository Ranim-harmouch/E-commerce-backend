import express from "express";
import { getAllAddresses, createAddress, deleteAddress } from "../controllers/orderShipmentAddressController.js";

const router = express.Router();

router.get("/", getAllAddresses);
router.post("/", createAddress);
router.delete("/:id", deleteAddress);

export default router;