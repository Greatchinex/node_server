// Models
import User from "../../models/user";
import Post from "../../models/posts";

export default {
  create_post: async (req, res) => {
    try {
      console.log(req.user);
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.user._id
      });

      const savedPost = await newPost.save();

      return res.json({
        msg: "Post created successfully",
        success: true,
        post: savedPost
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // View post created by a single user
  personal_post: async (req, res) => {
    try {
      // Fetch post
      const myPost = await Post.find({ creator: req.user._id }).populate(
        "creator full_name"
      );

      return res.json({
        success: true,
        post: myPost
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  }
};
