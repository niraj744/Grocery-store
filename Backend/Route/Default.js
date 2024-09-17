import { Router } from "express";
import {
  CreateUser,
  getCategories,
  getProducts,
  addCard,
  getOrders,
  deleteCartItem,
  getSelectedProducts,
  Checkout,
} from "../Controller/Default.js";

const route = Router();

route.post("/userCreate", CreateUser);
route.get("/getCategories", getCategories);
route.get("/getProducts", getProducts);
route.post("/addCard", addCard);
route.get("/getOrders/:id", getOrders);
route.delete("/deleteCartItem/:id", deleteCartItem);
route.get("/getSeletedProducts/:id", getSelectedProducts);
route.post("/checkOut", Checkout);

export default route;
