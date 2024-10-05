import express from "express";
import MyUserController from "../controller/MyUserController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateMyUserRequest} from "../middleware/validation";

const router = express.Router();
// api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
	"/",
	jwtCheck,
	jwtParse,
	validateMyUserRequest,
	MyUserController.updateCurrentUser,
);
router.get("/", jwtCheck, MyUserController.getCurrentUser);
export default router;
