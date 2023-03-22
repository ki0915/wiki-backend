import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const secretKey = 'my-secret-key';


const logger = winston.createLogger({
  level: 'info',  // 저장할 로그 레벨 설정
  format: winston.format.json(),  // 로그 형식 설정
  transports: [
    new winston.transports.File({ filename: './logs/verify.log' })  // 파일 저장 위치와 파일명 설정
  ]
});



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 헤더에서 토큰 추출
  const headers = req.header('x-auth-token');
  const token = headers?.toString();
  if (!token) {
    logger.info("헤더가 없는 사용자입니다.");
    return res.status(401).json({ msg: '인증 토큰이 없습니다. 인증되지 않은 사용자입니다.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey as string) as object;
    console.log(decoded);
    req.user = decoded;
    console.log("유저 확인");
    next();
  } catch (err) {
    logger.info(err);
    console.log("실패함");
    return res.status(401) .json({ msg: '인증 토큰이 유효하지 않습니다. 인증되지 않은 사용자입니다.' });
  }
};