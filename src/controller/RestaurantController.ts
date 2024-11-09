import {Request, Response} from "express";
import Restaurant from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
	try {
		const {city} = req.params;
		type query = {
			searchQuery?: string;
			selectedCuisines?: string;
			sortOption?: string;
			page?: string;
		};
		const {searchQuery, selectedCuisines, sortOption = "updatedAt", page = "1"}: query = req.query;
		let query: any = {};
		query["city"] = new RegExp(city, "igs");
		const cityCheck = await Restaurant.countDocuments(query);
		if (cityCheck === 0) {
			return res.status(404).json({
				data: [],
				pagination: {
					total: 0,
					page: 1,
					pages: 1,
				},
			});
		} else if (selectedCuisines) {
			const cuisinesArray = selectedCuisines.split(",").map(cuisine => new RegExp(cuisine, "i"));
			query["cuisines"] = {$all: cuisinesArray};
		} else if (searchQuery) {
			const searchRegex = new RegExp(searchQuery, "igs");
			query["$or"] = [{restaurantName: searchRegex}, {cuisines: {$in: [searchRegex]}}];
		}

		const pageSize = 10;
		const skip = (parseInt(page) - 1) * pageSize;

		const restaurants = await Restaurant.find(query)
			.sort({[sortOption]: 1})
			.skip(skip)
			.limit(pageSize)
			.lean();

		const total = await Restaurant.countDocuments(query);
		const response = {
			data: restaurants,
			pagination: {
				total,
				page: parseInt(page),
				pages: Math.ceil(total / pageSize),
			},
		};
		res.json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export default {searchRestaurants};
