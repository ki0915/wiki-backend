import { Server } from "http";
import { Server as Websocket, Socket, Namespace } from "socket.io";
import winston from "winston";
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

  const logger = winston.createLogger({
    level: 'info',  // 저장할 로그 레벨 설정
    format: winston.format.json(),  // 로그 형식 설정
    transports: [
      new winston.transports.File({ filename: './logs/socket.log' })  // 파일 저장 위치와 파일명 설정
    ]
  });
  

export const initializeWebsocket = (server: Server) => {
    const io = new Websocket(server, {
        cors: {},
    });

    websocket =io.of("/chats");
    websocket.on("connect", (socket: Socket) => {
        socket.on(ChatListenEvent.JOIN_ROOM, ({chatTitle}) => {
            logger.info(chatTitle + "에 입장하였습니다.");
            socket.join(`chats-${chatTitle}`);
        })

        socket.on(ChatListenEvent.SEND_MESSAGE, receiveMessage);

        websocket.on("error", (socket: Socket) => {
            logger.error("소켓 연결에 실패하였습니다.");
        });
})
    };

export const getSocket = () => {
    return websocket;
}