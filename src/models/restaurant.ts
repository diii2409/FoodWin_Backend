import mongoose from "mongoose";

const menuItemShema = new mongoose.Schema({
  name : {type: String, required: true},
  price : {type: Number, required: true},
})

const restaurantShema = new mongoose.Schema(
	{
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		restaurantName: {type: String, required: true},
		city: {type: String, required: true},
		country: {type: String, required: true},
		deliveryPrice: {type: Number, required: true},
		estimateDeliveryTime: {type: Number, required: true},
		cuisines: [{type: [String], required: true}],
		menuItems: [menuItemShema],
		imageUrl: {type: String, required: true},
	},
	{
		timestamps: true,
	},
);

const Restaurant = mongoose.model("Restaurant", restaurantShema);
export default Restaurant;
