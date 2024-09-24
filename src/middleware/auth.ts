import {auth} from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
	audience: process.env.AUTH0_AUDIENCE as string,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string,
	tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG as string,
});
