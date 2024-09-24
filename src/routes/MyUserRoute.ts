import express from "express";
import MyUserController from "../controller/MyUserController";
import {jwtCheck} from "../middleware/auth";

const router = express.Router();
// api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
