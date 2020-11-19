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

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: { no_of_post: +1 }
        },
        { new: true }
      );

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
  },

  // Edit/update a post
  update_post: async (req, res) => {
    try {
      console.log(req.params);
      // Check if Post with the params Id exists in DB
      const findId = await Post.findById(req.params.postId);

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false
        });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true }
      );

      return res.json({
        msg: "Post updated Successfully",
        success: true,
        post: updatedPost
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // Delete a Post
  delete_post: async (req, res) => {
    try {
      // Check if Post with the params Id exists in DB
      const findId = await Post.findById(req.params.postId);

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false
        });
      }

      await Post.findByIdAndRemove(req.params.postId);

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: { no_of_post: -1 }
        },
        { new: true }
      );

      return res.json({
        msg: "Post Deleted Successfully",
        success: true
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  }
};
