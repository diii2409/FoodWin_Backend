import express from "express";
import CloudinaryController from "../controller/CloudinaryController";
const router = express.Router();

router.get("/signature", CloudinaryController.getCloudinarySignatureController);

export default router;
