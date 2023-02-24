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
    const newMessage = await Chat.create({
        roomTitle,
        senderId,
        message,
    });

    const namespace = getSocket();
    namespace.to('chats-${roomTitle}').emit(ChatEmitEvent.RECEIVE_MESSAGE, {
        roomTitle,
        senderId,
        message,
    });
};

