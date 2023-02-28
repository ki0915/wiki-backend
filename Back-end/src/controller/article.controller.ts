import * as express from "express";
import multer from "multer";
import { Article } from "../../models/article";
import { User } from "../../models/user";
import {authMiddleware} from './verify.token';
import { Request } from 'express';
import { File } from "../../models/file"; 
import { Image } from "../../models/image";
import path from "path";

const a = 1;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

interface FilesObject {
  [fieldname: string]: Express.Multer.File[];
}


const router = express.Router();
router.use(authMiddleware);



router.post("/", authMiddleware, async (req, res) => {
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json();
    }

    try{
  
    const article = await Article.findOne({
        where: {
            title: title,
        }
    });

    const image = await Image.findOne({
      where: {
        title: title,
      }
    });


    const file = await File.findOne({
      where: {
        title: title,
      }
    });
  
    
    if (!article) {
      return res.status(400).json();
    }

    if(!file) {
      console.log("파일 없음");
       return res.status(400).json();
    } 

    if(!image) {
      return res.status(400).json();
   } 
    
   const filePath = path.join(file.dataValues.path);
   const imagePath = path.join(image.dataValues.path);
    
    
    return res.status(200).json({article, filePath, imagePath});

  } catch(err){
      return res.status(400).json();
  }
  });



router.post("/post", upload.fields([{ name: 'file' }, { name: 'image' }]), authMiddleware, async (req, res) => {
  
  const title = req.body.title;
  const article1 = req.body.article1;
  const article2 = req.body.article2;
  const article3 = req.body.article3;
  const article4 = req.body.article4;
  const article5 = req.body.article5;
  const article6 = req.body.article6;

  const onetitle = req.body.onetitle;
  const twotitle = req.body.twotitle;
  const threetitle = req.body.threetitle;
  const fourtitle = req.body.fourtitle;
  const fivetitle = req.body.fivetitle;
  const sixtitle = req.body.sixtitle;
  
  const files = req.files as FilesObject;

  const fileArray = files['file']; // files.file로 접근 불가
  const imageArray = files['image'];
  
  if (!files || !imageArray) {
    console.log('No files uploaded');
    return res.status(400).json();
    
  }
      // 명시적인 타입 캐스팅


    if (!title) {
      console.log("제목이 존재하지 않습니다.");
      return res.status(400).json();
    }
  

  
    const existArticle = await Article.findOne({
      where: {
        title: title
      },
    });
  
    if (existArticle) {
      console.log("이미 존재하는 항목입니다.");
      return res.status(404).json();
    }
  
    else {
      
      try{
      
    const newArticle = await Article.create({
      title,
      article1,
      article2,
      article3,
      article4,
      article5,
      article6,
      onetitle,
      twotitle,
      threetitle,
      fourtitle,
      fivetitle,
      sixtitle,
    });

    const newFile = await File.create({
      title,
      path: fileArray[0].path,
      fileName: fileArray[0].filename
    });


    const newImage = await Image.create({
      title,
      path: imageArray[0].path,
      imageName: imageArray[0].filename
    });
  
      return res.status(201).json();
  } catch(err){
    return  res.status(400).json();
  }
  }
  });


  router.get("/", async (req, res) => {

    try{
    const articleList = await Article.findAll();

    return res.status(200).json(articleList); 
    } catch(err)
    {
      return res.status(404).json();
    }
  
    

  });


  router.post("/update", authMiddleware, async (req, res) => {
    const { title, article1, article2, article3, article4, article5, article6 } = req.body.form;
    
    if (!title) {
      return res.status(400).json();
    }
  
  
    const existArticle = await Article.findOne({
      where: {
        title: title
      },
    });
  
    if (existArticle) {
        Article.update({article1: article1, article2: article2,article3: article3, article4: article4, article5: article5, article6: article6 }, { where: {title: title}});
        return res.status(202).json();
    }
  
    else {
    return res.status(404).json();
  }
  });


  router.post("/delete", authMiddleware, async (req, res) => {
    const { title } = req.body;
    const user = req.body.userId;

    if (!title || !user) {
      return res.status(400).json();
    }
  
  
    try{
    const existArticle = await Article.findOne({
      where: {
        title: title
      },
    });

    const existUser = await User.findOne({
      where: {
        id: user,
        authority: 3
      },
    });
  
    if (existArticle && existUser) {
        Article.destroy({ where: {title: title}});
        return res.status(202).json();
    }
  
    else {
    return res.status(404).json();
  }}
  catch(err){
    return res.status(400).json();
  }
  });

  
  
  export default router;