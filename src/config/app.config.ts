/* eslint-disable prettier/prettier */

export const enviromentConfiguration = () => ({
  port: process.env.PORT,
  username: process.env.USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DATABASE: process.env.DATABASE,
  SYNCRONIZE: process.env.SYNCRONIZE,
  JWT_SECRET: process.env.JWT_SECRET_KEY
});
