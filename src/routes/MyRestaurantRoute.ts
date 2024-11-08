// backend/src/routes/MyRestaurantRoute.ts
import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateMyRestaurantRequest} from "../middleware/validation";

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
	upload.single("imageFile"),
	jwtParse,
	validateMyRestaurantRequest,
	MyRestaurantController.createRestaurant,
);
router.put(
	"/",
	jwtCheck,
	upload.single("imageFile"),
	jwtParse,
	validateMyRestaurantRequest,
	MyRestaurantController.updateRestaurant,
);
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getRestaurant);

export default router;
