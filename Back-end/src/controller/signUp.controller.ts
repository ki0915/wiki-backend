import express from "express";
import { User } from "../../models/user";
import bcrypt from "bcrypt";

const router = express.Router();


router.post("/", async (req, res) => {
  const { id, password } = req.body;

  const existUser = await User.findOne({
    where: {
      id: id,
      password: password,
    },
  });

  if(id.length > 80 || password.length > 80)
  {
      return res.status(400).json({
          message: "잘못된 사용자의 요청입니다.",
      });
  }


  if (existUser) {
    return res.status(404).json();
  }

  else {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("접속 하였습니다.");
    const newUser = await User.create({
    id,
    password: hashedPassword,
    authority: 1
  });

  return res.status(201).json(newUser);
}
});


export default router;