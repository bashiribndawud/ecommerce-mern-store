import express from "express";
const router = express.Router();
import {
  allProduct,
  singleProduct,
  getCartItems,
  PlaceOrder,
} from "../controllers/product.js";

router.get("/all", allProduct);
router.get("/one", singleProduct);
router.post("/store/cartitems", getCartItems);
router.post("/checkout", PlaceOrder);
export default router;