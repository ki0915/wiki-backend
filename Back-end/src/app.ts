
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
import expressWinston from "express-winston";
import winston from "winston";
import helmet from "helmet";
import hpp from "hpp";

const app = express();


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
app.use(helmet());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

app.use(helmet.hidePoweredBy()); // Server와 X-Poowered-By 헤더 정보 은닉


  app.use(helmet( { contentSecurityPolicy: false } )); // helmet 모듈
  app.use(hpp()); // hpp 모듈

  
  
const server = createServer(app);
initializeWebsocket(server);
server.listen(process.env.PORT || 10000, async () => {
    // //sequelize-db 연결 테스트
     await sequelize.authenticate()
     .then(async () => {
         console.log("connection successs");
     })
     .catch((e) => {
         console.log('TT : ', e);
     })
});


