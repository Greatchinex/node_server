import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    message: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
