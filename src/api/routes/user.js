import express from "express";

import user from "../controllers/user";

import { auth } from "../../config/auth";

const router = express.Router();

router.post("/me/details", user.details);
router.post("/createUser", user.create_user);
router.post("/login", user.user_login);
router.get("/user/me", auth, user.get_profile);
router.patch("/user/updateUser", auth, user.update_profile);

export { router as userRouter };
