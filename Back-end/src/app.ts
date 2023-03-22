
import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import controller from "./controller";
import cors from "cors";
import { sequelize } from "../models";
import { initializeWebsocket } from "../socket/socket";
import session from "express-session";
import crypto from "crypto";
import path from "path";
import helmet from "helmet";
import hpp from "hpp";

const app = express();

//쿠키가 true로 설정된 속성으로 보호되면 암호화되지 않은 HTTP 요청을 통해 브라우저에 의해 전송되지 않으므로 중간자 공격 중에 권한 없는 사용자가 쿠키를 관찰할 수 없습니다.
// 이렇게 진단되어 쿠키를 암호화해서 넘기었습니다. 

//cors가 이와 같이 사용되어 과거에 취약점이 발생하였습니다. 자세한 내용은 주석하지 않겠으나 이를방치하기 위해 특정 웹 사이트만 cors 로 허용 하도록 하였습니다.
// 그러니 클라이언트 서버 혹은 개발 환경으로 서버를 돌릴 때에 아래의 설정으로 서버 주소를 추가해주세요.

const  corsOptions = {
    origin: 'trustedwebsite.com' // Compliant
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controller);
app.use(session({
    secret: crypto.randomBytes(64).toString('hex'), // 
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


