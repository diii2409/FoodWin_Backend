import {v2 as loundinary} from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import CloudinayRoute from "./routes/CloudinaryRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import myUserRoute from "./routes/MyUserRoute";
import orderRouter from "./routes/OrderRoute";
import restaurantRoute from "./routes/RestaurantRoute";

const app = express();

app.use(cors());

// middleware được sử dụng để xử lý dữ liệu thô (raw data) từ yêu cầu HTTP.
app.use("/api/order/checkout/webhook", express.raw({type: "*/*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/order", orderRouter);
app.use("/cloudinary", CloudinayRoute);

app.get("/health", async ({req, res}: {req: Request; res: Response}) => {
	res.send({message: "Health check passed"});
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log("server started on https://localhost:7000");
});
// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
	console.log("Connected to database");
});

loundinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
