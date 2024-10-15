import {v2 as loundinary} from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async ({req, res}: {req: Request; res: Response}) => {
	res.send({message: "Health check passed"});
});

app.use("/api/my/user", myUserRoute);

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log("server started on https://localhot:7000");
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
