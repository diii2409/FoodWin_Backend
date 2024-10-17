import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import {jwtCheck, jwtParse} from "../middleware/auth";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1025, // 5MB ,
	},
});

// api/my/user
router.post(
	"/",
	jwtCheck,
	jwtParse,
	upload.single("imageFile"),
	MyRestaurantController.createRestaurant,
);
router.put("/", jwtCheck, MyRestaurantController.updateRestaurant);
router.get("/", jwtCheck, MyRestaurantController.getRestaurant);

export de