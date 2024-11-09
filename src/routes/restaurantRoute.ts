import express from "express";
import {param} from "express-validator";
import RestaurantController from "../controller/RestaurantController";

const router = express.Router();

// /api/restaurant/search/CITY
router.get(
	"/search/:city",
	param("city").isString().trim().notEmpty().withMessage("City paramater must be valid string"),
	RestaurantController.searchRestaurants,
);

export default router;
