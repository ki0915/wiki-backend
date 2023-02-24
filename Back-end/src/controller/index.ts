import express from "express";
import loginController from "./login.controller";
import signUpController from "./signUp.controller";
import articleController from "./article.controller";
import chatController from "./chat.controller";

const router = express.Router();

router.use("/login", loginController);
router.use("/signUp", signUpController);
router.use("/article", articleController);
router.use("/chats",  chatController);

export default router;