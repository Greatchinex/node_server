import express from "express";

import post from "../controllers/post";

import { auth } from "../../config/auth";

const router = express.Router();

router.post("/createPost", auth, post.create_post);
router.get("/me/posts", auth, post.personal_post);
router.patch("/updatePost/:postId", auth, post.update_post);
router.delete("/deletePost/:postId", auth, post.delete_post);

export { router as postRouter };
