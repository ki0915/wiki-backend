import express, { request, response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { channel } from "diagnostics_channel";
import winston from "winston";

const router = express.Router();

const secretKey = 'my-secret-key';


const logger = winston.createLogger({
  level: 'info',  // 저장할 로그 레벨 설정
  format: winston.format.json(),  // 로그 형식 설정
  transports: [
    new winston.transports.File({ filename: './logs/login.log' })  // 파일 저장 위치와 파일명 설정
  ]
});


router.post("/", async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    if(!id && !password)
    {
        return res.status(400).json({
            message: "잘못된 사용자의 요청입니다.",
        });
    }


    if(id.length > 80 || password.length > 80)
    {
        return res.status(400).json({
            message: "잘못된 사용자의 요청입니다.",
        });
    }

        const existUser = await User.findOne({
        where: {
          id: id,
        },
      });


   if (!existUser) {

      logger.info(id + ':' + '로그인 실패 ' + '존재하지 않는 플레이어 입니다.');
      return res.status(400).json();
    }

    
    const isPasswordValid = await bcrypt.compare(password, existUser.dataValues.password);
    
    if (isPasswordValid) {
      console.log("로그인 성공");

      try {
        const token = jwt.sign({ userId: existUser.dataValues.id }, secretKey, { expiresIn: '30m' });
        logger.info(`${id}` + "가 입장하셨습니다.");
        logger.info(`${id}에 ${token} 이 할당되었습니다.`);
        return res.status(200).json({ token });
      } catch (err) {
        logger.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      logger.error(`${id} 회원 로그인 실패: 비밀번호가 일치하지 않습니다.`);
      return res.status(400).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

});


export default router;