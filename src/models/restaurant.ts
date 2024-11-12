import mongoose, {InferSchemaType} from "mongoose";

const menuItemSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		default: () => new mongoose.Types.ObjectId(),
	},
	name: {type: String},
	price: {type: Number},
});
export type menuItemType = InferSchemaType<typeof menuItemSchema>;
const restaurantShema = new mongoose.Schema(
	{
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		restaurantName: {type: String},
		city: {type: String},
		country: {type: String},
		deliveryPrice: {type: Number},
		estimatedDeliveryTime: {type: Number},
		cuisines: [{type: String}],
		menuItems: [menuItemSchema],
		imageUrl: {type: String},
	},
	{
		timestamps: true,
	},
);

const Restaurant = mongoose.model("Restaurant", restaurantShema);
export default Restaurant;
