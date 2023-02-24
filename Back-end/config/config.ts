import dotenv from 'dotenv';
dotenv.config();

const config = {
  development : {
      username : process.env.DB_USERNAME || 'root',
      password : process.env.DB_PASSWD || '1234',
      database : process.env.DB_DBNAME || 'test',
      host : process.env.DB_HOST || 'localhost',
      port : 3306,
      dialect : "mysql"
  }
};

export default config;