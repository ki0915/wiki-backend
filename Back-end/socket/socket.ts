import { Server } from "http";
import { Server as Websocket, Socket, Namespace } from "socket.io";
import { receiveMessage } from "./chat.socket";

let websocket: Namespace;

export enum ChatListenEvent {
    JOIN_CHANNEL = "joinChannel",
    JOIN_ROOM = "joinRoom",
    SEND_MESSAGE = "sendMessage",
    READ_MESSAGE = "readMessage",
  }

  export enum ChatEmitEvent {
    RECEIVE_MESSAGE = "receiveMessage",
    UPDATE_ROOM = "updateRoom",
  }


export const initializeWebsocket = (server: Server) => {
    const io = new Websocket(server, {
        cors: {},
    });

    websocket =io.of("/chats");
    websocket.on("connect", (socket: Socket) => {
        console.log("연결되었습니다.")
        socket.on(ChatListenEvent.JOIN_ROOM, ({chatTitle}) => {
            socket.join(`chats-$(chatTitle)`);
        });

        socket.on(ChatListenEvent.SEND_MESSAGE, receiveMessage);

        websocket.on("error", (socket: Socket) => {
            console.log("에러");
        });
})
    };

export const getSocket = () => {
    return websocket;
}