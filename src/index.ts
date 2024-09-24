import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/test", async ({req, res}: {req: Request; res: Response}) => {
// 	res.json({message: "hello!"});
// });

app.use("/api/my/user", myUserRoute);

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log("server started on https://localhot:7000");
});
// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
	console.log("Connected to database");
});
