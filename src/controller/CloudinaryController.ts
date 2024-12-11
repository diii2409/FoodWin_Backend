import crypto from "crypto";
import {Request, Response} from "express";
const getCloudinarySignatureController = async (req: Request, res: Response) => {
	try {
		const timestamp = Math.floor(Date.now() / 1000);
		const {public_id} = req.query;
		if (!public_id) {
			return res.json("dont have public_id");
		}
		const api_key = process.env.CLOUDINARY_API_KEY as string;
		const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
		const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
		const stringToSign = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
		const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");
		res.json({signature, timestamp, api_key, cloudName});
	} catch (error: any) {
		res.status(500).json({error: error.message});
	}
};
export default {getCloudinarySignatureController};
