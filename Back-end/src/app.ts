
import express from "express";
import { createServer, Server } from "http";
import bodyParser from "body-parser";
import controller from "./controller";
import cors from "cors";
import { sequelize } from "../models";
import * as dotenv from "dotenv";
import { initializeWebsocket } from "../socket/socket";
import session from "express-session";
import crypto from "crypto";
import path from "path";
import logger from "./controller/logger";
import expressWinston from "express-winston";
import winston from "winston";


const app = express();

const fileTransport = new winston.transports.File({
    filename: "logs/express.log",
    level: 'debug'
  });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controller);
app.use(session({
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
app.use(expressWinston.logger({
    transports: [fileTransport],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    meta: true, // 메타 정보 출력 여부
    msg: `HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`, // 출력할 로그 포맷
    expressFormat: true, // Express 기본 로그 포맷 사용 여부
    colorize: false // 컬러 출력 여부
}));



const server = createServer(app);
initializeWebsocket(server);
server.listen(process.env.PORT || 8080, async () => {
    // //sequelize-db 연결 테스트
     await sequelize.authenticate()
     .then(async () => {
         console.log("connection success");
     })
     .catch((e) => {
         console.log('TT : ', e);
     })
});