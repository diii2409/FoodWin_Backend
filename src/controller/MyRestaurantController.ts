import cloudinary from "cloudinary";
import {Request, Response} from "express";
import mongoose from "mongoose";
import Restaurant from "../models/restaurant";
// create Restaurant
const createRestaurant = async (req: Request, res: Response) => {
	try {
		const existingRestaurant = await Restaurant.findOne({user: req.userId});
		console.log("req.body", req.body);
		// if (existingRestaurant) {
		// 	return res.status(409).json({message: "User restaurant already exists"});
		// }
		const image = req.file as Express.Multer.File;
		const base64Image = Buffer.from(image.buffer).toString("base64");
		const dataURL = `data:${image.mimetype};base64,${base64Image}`;

		const uploadResponse = await cloudinary.v2.uploader.upload(dataURL);

		const restaurant = new Restaurant(req.body);
		restaurant.imageUrl = uploadResponse.url;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		await restaurant.save();

		res.status(201).send(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({error: "Internal server error", message: req.body});
	}
};

const updateRestaurant = async (req: Request, res: Response) => {};
const getRestaurant = async (req: Request, res: Response) => {};

export default {createRestaurant, updateRestaurant, getRestaurant};
