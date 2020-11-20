import express from "express";
import dotenv from "dotenv";
// import { config } from "dotenv"

dotenv.config();
// config();

// DB
import "./config/db";
// Routes
import routes from "./api/routes";

const app = express();
app.use(express.json());
routes(app);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
