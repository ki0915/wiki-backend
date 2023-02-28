import { Op } from "sequelize";
import { ChatEmitEvent, getSocket } from "./socket";
import { Chat } from "../models/chat";

type ReceiveMessageType = {
    roomTitle: string ;
    senderId: string;
    message: string;   
}



export const receiveMessage = async (received: ReceiveMessageType) => {
    const { roomTitle, senderId, message } = received;

    try{
    const newMessage = await Chat.create({
        roomTitle,
        senderId,
        message,
    });

    const namespace = getSocket();

    console.log(roomTitle + "로 메시지를 보냅니다.");
    namespace.to(`chats-${roomTitle}`).emit("receiveMessage", { roomTitle, senderId,  message });
} catch(err){
    console.log("싫패");
}
};

