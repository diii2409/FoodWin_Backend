import cloudinary from "cloudinary";
import {Request, Response} from "express";
import mongoose from "mongoose";
import Restaurant from "../models/restaurant";

const uploadImage = async (file: Express.Multer.File) => {
	const image = file as Express.Multer.File;
	const base64Image = Buffer.from(image.buffer).toString("base64");
	const dataURL = `data:${image.mimetype};base64,${base64Image}`;

	const uploadResponse = await cloudinary.v2.uploader.upload(dataURL);

	return uploadResponse.url;
};

// create Restaurant
const createRestaurant = async (req: Request, res: Response) => {
	try {
		const existingRestaurant = await Restaurant.findOne({user: req.userId});

		// if (existingRestaurant) {
		// 	return res.status(409).json({message: "User restaurant already exists"});
		// }
		req.body.cuisines = req.body.cuisines;
		const restaurant = new Restaurant(req.body);
		if (req.file) {
			restaurant.imageUrl = await uploadImage(req.file);
		}
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
		if (req.file) {
			restaurant.imageUrl = await uploadImage(req.file);
		}

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

export default {createRestaurant, updateRestaurant, getRestaurant};
