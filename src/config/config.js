import dotenv from "dotenv";

dotenv.config();

export default {
  SECRET: process.env.JWT_SECRET
};
