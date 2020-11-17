import { userRouter } from "./user";
import { postRouter } from "./post";

export default (app) => {
  app.use(userRouter);
  app.use(postRouter);
};
