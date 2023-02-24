import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'my-secret-key';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 헤더에서 토큰 추출
  const headers = req.header('x-auth-token');
  const token = headers?.toString();
  if (!token) {
    console.log("헤더가 없음");
    console.log(token);
    return res.status(401).json({ msg: '인증 토큰이 없습니다. 인증되지 않은 사용자입니다.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey as string) as object;
    console.log(decoded);
    req.user = decoded;
    console.log("유저 확인");
    next();
  } catch (err) {
    console.error(err);
    console.log("실패함");
    return res.status(401) .json({ msg: '인증 토큰이 유효하지 않습니다. 인증되지 않은 사용자입니다.' });
  }
};