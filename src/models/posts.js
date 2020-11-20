import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    image: {
      type: String
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
