import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    // images: {
    //     type: String
    //   },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
