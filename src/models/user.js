import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    full_name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    phone_number: {
      type: String
    },
    address: {
      type: String
    },
    no_of_post: {
      type: Number,
      default: 0
    },
    created_post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
