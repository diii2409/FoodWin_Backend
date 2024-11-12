import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		deliveryDetails: {
			email: {type: String},
			name: {type: String},
			addressLine1: {type: String},
			city: {type: String},
		},
		cartItems: [
			{
				menuItemId: {type: String},
				quantity: {type: Number},
				name: {type: String},
			},
		],
		totalAmount: {type: Number},
		status: {type: String, enum: ["placed", "paid", "isProgress", "outForDelivery", "delivered"]},
	},
	{
		timestamps: true,
	},
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
