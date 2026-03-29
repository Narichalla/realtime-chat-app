import express from "express";
import { chatWithAi } from "../controllers/AiController.js";
import { protectRoute } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/chat", protectRoute, chatWithAi);

export default router;