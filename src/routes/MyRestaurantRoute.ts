import express from "express";
import MyRestaurantController from "../controller/MyRestaurantController";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1025 // 5MB ,
    
  }
})

// api/my/user
router.post("/", MyRestaurantController.createRestaurant);
router.put("/", MyRestaurantController.updateRestaurant);
router.get("/", MyRestaurantController.getRestaurant);
