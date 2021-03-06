import express from "express";

import post from "../controllers/post";

import { auth } from "../../config/auth";
import { parser } from "../../services/fileUpload";

const router = express.Router();

router.post("/createPost", parser.single("file"), auth, post.create_post);
router.get("/me/posts", auth, post.personal_post);
router.patch("/updatePost/:postId", auth, post.update_post);
router.delete("/deletePost/:postId", auth, post.delete_post);
router.post(
  "/post/createComment/:postId",
  parser.array("image"),
  auth,
  post.post_comment
);
router.get("/post/getComments/:postId", auth, post.get_post_comment);

export { router as postRouter };
