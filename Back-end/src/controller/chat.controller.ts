
import express from "express";
import { Chat } from "../../models/chat";
import {authMiddleware} from './verify.token';

const router = express.Router();
const cha = '1';
router.use(authMiddleware);

router.post("/view", async(req, res) => {
    const { roomTitle } = req.body;
    console.log(roomTitle);
    
    if(!roomTitle){
        return res.status(400).json(1);
    }

   
    const chats = await Chat.findAll({
        where: {
            roomTitle,
        }
    });

    


    const chatList = chats.map((chat) => {
        return {
            roomTitle: chat.roomTitle,
            senderId: chat.senderId,
            message: chat.message,
        }
    });

    console.log(chatList);
    return res.status(200).json(chatList);
})








export default router;