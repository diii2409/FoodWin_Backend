import {Request, Response} from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Restaurant from "../models/restaurant";

// const uploadImage = async (file: Express.Multer.File) => {
// 	const image = file as Express.Multer.File;
// 	const base64Image = Buffer.from(image.buffer).toString("base64");
// 	const dataURL = `data:${image.mimetype};base64,${base64Image}`;

// 	const uploadResponse = await cloudinary.v2.uploader.upload(dataURL);

// 	return uploadResponse.url;
// };

// create Restaurant
const createRestaurant = async (req: Request, res: Response) => {
	try {
		const existingRestaurant = await Restaurant.findOne({user: req.userId});

		// if (existingRestaurant) {
		// 	return res.status(409).json({message: "User restaurant already exists"});
		// }
		req.body.cuisines = req.body.cuisines;
		const restaurant = new Restaurant(req.body);
		// if (req.file) {
		// 	restaurant.imageUrl = await uploadImage(req.file);
		// }
		restaurant.imageUrl = req.body.imageUrl;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		await restaurant.save();

		res.status(200).send(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({error: "Internal server error", message: req.body});
	}
};
// update Restaurant
const updateRestaurant = async (req: Request, res: Response) => {
	try {
		const restaurant = await Restaurant.findOne({user: req.userId});

		if (!restaurant) {
			return res.status(404).json({message: "Restaurant not found"});
		}
		restaurant.restaurantName = req.body.restaurantName;
		restaurant.city = req.body.city;
		restaurant.country = req.body.country;
		restaurant.deliveryPrice = req.body.deliveryPrice;
		restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
		restaurant.cuisines = req.body.cuisines;
		restaurant.menuItems = req.body.menuItems;
		restaurant.imageUrl = req.body.imageUrl as string;
		// if (req.file) {
		// 	restaurant.imageUrl = await uploadImage(req.file);
		// }

		await restaurant.save();
		res.status(200).send(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Internal server error"});
	}
};
// get Restaurant
const getRestaurant = async (req: Request, res: Response) => {
	try {
		const restaurant = await Restaurant.findOne({user: req.userId});
		if (!restaurant) {
			return res.status(404).json({message: "Restaurant not found"});
		}
		res.json(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Internal server error"});
	}
};

const getRestaurantOrder = async (req: Request, res: Response) => {
	try {
		const {page = 1} = req.query;
		const restaurant = await Restaurant.findOne({user: req.userId});
		if (!restaurant) {
			return res.status(404).json({message: "Restaurant not found"});
		}
		const ordersCheck = await Order.countDocuments({restaurant: restaurant._id});
		if (ordersCheck === 0) {
			return res.status(200).json({
				data: [],
				pagination: {
					total: 0,
					page: 1,
					pages: 1,
				},
			});
		}
		const pageSize = 5;
		const skip = ((page as number) - 1) * pageSize;

		const orders = await Order.find({restaurant: restaurant._id})
			.populate("restaurant")
			.populate("user")
			.sort({createdAt: -1})
			.limit(pageSize)
			.skip(skip)
			.lean();
		const response = {
			data: orders,
			pagination: {
				total: ordersCheck,
				page: parseInt(page as string),
				pages: Math.ceil(ordersCheck / pageSize),
			},
		};
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Internal server error"});
	}
};

const updateOrderStatus = async (req: Request, res: Response) => {
	try {
		const {orderId} = req.params;
		const {status} = req.body;
		const restaurant = await Restaurant.findOne({user: req.userId});
		if (!restaurant) {
			return res.status(404).json({message: "Restaurant not found"});
		}
		const order = await Order.findOne({_id: orderId, restaurant: restaurant._id});
		if (!order) {
			return res.status(404).json({message: "Order not found"});
		}
		order.status = status;
		await order.save();
		res.json(order);
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Internal server error"});
	}
};

export default {
	createRestaurant,
	updateRestaurant,
	getRestaurant,
	getRestaurantOrder,
	updateOrderStatus,
};
