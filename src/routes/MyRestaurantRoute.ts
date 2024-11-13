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

router.get("/order", jwtCheck, jwtParse, MyRestaurantController.getRestaurantOrder);

// api/my/restaurants
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
router.patch(
	"/order/:orderId/status",
	jwtCheck,
	jwtParse,
	MyRestaurantController.updateOrderStatus,
);
export default router;
