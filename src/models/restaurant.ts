import mongoose from "mongoose";

const menuItemShema = new mongoose.Schema({
	name: {type: String},
	price: {type: Number},
});

const restaurantShema = new mongoose.Schema(
	{
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		restaurantName: {type: String},
		city: {type: String},
		country: {type: String},
		deliveryPrice: {type: Number},
		estimatedDeliveryTime: {type: Number},
		cuisines: [{type: [String]}],
		menuItems: [menuItemShema],
		imageUrl: {type: String},
	},
	{
		timestamps: true,
	},
);

const Restaurant = mongoose.model("Restaurant", restaurantShema);
export default Restaurant;
