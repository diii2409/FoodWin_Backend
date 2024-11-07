import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

const handleValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({error: error.array()});
	}
	next();
};

export const validateMyUserRequest = [
	body("name").isString().notEmpty().withMessage("Name must be a string"),
	body("addressLine1")
		.isString()
		.notEmpty()
		.withMessage("Address Line 1 must be a string"),
	body("city").isString().notEmpty().withMessage("City must be a string"),
	body("country").isString().notEmpty().withMessage("Country must be a string"),
	handleValidationErrors,
];

export const validateMyRestaurantRequest = [
	body("restaurantName").notEmpty().withMessage("RestaurantName is required"),
	body("city").notEmpty().withMessage("City is required"),
	body("country").notEmpty().withMessage("Country is required"),
	body("deliveryPrice")
		.isFloat({min: 0})
		.withMessage("Delivery price must be a positive number"),
	body("estimatedDeliveryTime")
		.isInt({min: 0})
		.withMessage("Estimated delivery time must be a positive integer"),
	body("cuisine")
		.isArray()
		.withMessage("Cuisine must be an array")
		.not()
		.isEmpty()
		.withMessage("Cuisine array must not be empty"),
	body("menuItems").isArray().withMessage("Menu items must be an array"),
	body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
	body("menuItems.*.price")
		.isFloat({min: 0})
		.withMessage("Price item name is required and must be a positive number"),
	handleValidationErrors,
];
