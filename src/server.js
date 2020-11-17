import express from "express";
import argon2 from "argon2";

// DB
import "./config/db";
// Routes
import routes from "./api/routes";

const app = express();
app.use(express.json());
routes(app);
const PORT = 9090;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
