import cors from "cors";
import "dotenv/config";
import express, {Request, Response} from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
	res.json({message: "hello!"});
});

app.listen(7000, () => {
	console.log("server started on localhot:7000");
});
// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
	console.log("Connected to database");
});
