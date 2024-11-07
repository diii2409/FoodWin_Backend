import {NextFunction, Request, Response} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
	namespace Express {
		interface Request {
			auth0Id: string;
			userId: string;
		}
	}
}

export const jwtCheck = auth({
	audience: process.env.AUTH0_AUDIENCE as string,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string,
	tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG as string,
});

export const jwtParse = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const {authorization} = req.headers;
	console.log("jwtParse", req.body);

	// check if the authorization header is present
	if (!authorization || !authorization.startsWith("Bearer ")) {
		return res.status(401).json({message: "Unauthorized"});
	}
	const token = authorization.split(" ")[1];

	try {
		const decoded = (await jwt.decode(token)) as jwt.JwtPayload;
		const auth0Id = decoded.sub;
		const user = await User.findOne({auth0Id});

		if (!user) {
			return res.status(401).json({message: "User not found"});
		}
		req.auth0Id = auth0Id as string;
		req.userId = user._id.toString();
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({message: "Error parsing token"});
	}
};
