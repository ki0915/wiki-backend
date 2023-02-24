import express, { request, response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const secretKey = 'my-secret-key';

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
    console.log("로그인 실패");
      return res.status(400).json();
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.dataValues.password);
    
    if (isPasswordValid) {
      console.log("로그인 성공");
      const token = jwt.sign({userId: existUser.dataValues.id}, secretKey, {expiresIn: '30m'});
      console.log(token);
      return res.status(200).json({token});
    } else {
      console.log("로그인 실패: 비밀번호가 일치하지 않습니다.");
      console.log(existUser.dataValues.password);
      return res.status(400).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

});


export default router;