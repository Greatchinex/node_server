// Models
import User from "../../models/user";
import Post from "../../models/posts";
import Comment from "../../models/comment";

export default {
  create_post: async (req, res) => {
    try {
      if (req.file) {
        const newPost = new Post({
          title: req.body.title,
          content: req.body.content,
          creator: req.user._id,
          image: req.file.path
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
      } else {
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
      }
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
  },

  // Comment on a post
  post_comment: async (req, res) => {
    try {
      console.log(req.files);
      if (req.files) {
        const urls = [];

        // Loop through the req.files and for each file push the
        // Image url(path) into the urls variable above
        for (let index = 0; index < req.files.length; index++) {
          const singleFile = req.files[index];

          urls.push(singleFile.path);
        }

        // Check if Post with the params Id exists in DB
        const findId = await Post.findById(req.params.postId);

        if (!findId) {
          return res.json({
            msg: "Post not found",
            success: false
          });
        }

        const newComment = new Comment({
          message: req.body.message,
          // user is current logged in user from auth
          user: req.user._id,
          post: req.params.postId,
          image: urls
        });

        const savedComment = await newComment.save();

        return res.json({
          msg: "Comment created",
          success: true,
          comment: savedComment
        });
      } else {
        // Check if Post with the params Id exists in DB
        const findId = await Post.findById(req.params.postId);

        if (!findId) {
          return res.json({
            msg: "Post not found",
            success: false
          });
        }

        const newComment = new Comment({
          message: req.body.message,
          // user is current logged in user from auth
          user: req.user._id,
          post: req.params.postId
        });

        const savedComment = await newComment.save();

        return res.json({
          msg: "Comment created",
          success: true,
          comment: savedComment
        });
      }
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // Fetch all comments for a certain posts
  get_post_comment: async (req, res) => {
    try {
      // Fetch more details about the user and post instead of only the
      // Object Id
      const populateQuery = [
        { path: "user", select: "full_name" },
        { path: "post", select: "title content" }
      ];

      const postComment = await Comment.find({
        post: req.params.postId
      }).populate(populateQuery);

      return res.json({
        success: true,
        comments: postComment
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  }

  // 1. Assignment: Fetch all comments that belong to a single user......Auth Must be present
  // 2. populate post
  // Fetch single comment.....
  // ADDITIONALS
  // Update a comment
  // Delete a comment

  // Code Refactoring
  // 1. create a comment.js file in controllers and routes folder.
  // 2. move the post_comment and get_post_comment controllers along with their routes
  // into the appropriate comment.js files. dont forget to export the router in the index.js
};
