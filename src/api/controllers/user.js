import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Models
import User from "../../models/user";

// Config
import config from "../../config/config";

export default {
  details: async (req, res) => {
    try {
      const { full_name, Gender, Occupation, password } = req.body;

      const hashed = await argon2.hash(password);

      const obj = {
        name: full_name,
        occupation: Occupation,
        gender: Gender,
        password: hashed
      };

      return res.json({
        user: obj
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // Create User
  create_user: async (req, res) => {
    try {
      const { full_name, email, password } = req.body;

      // Check if user with email already exist in DB
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        return res.json({
          msg: "User with email already exists",
          success: false
        });
      }

      const hashed = await argon2.hash(password);

      const newUser = new User({
        full_name: full_name,
        email: email,
        password: hashed
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ userId: savedUser._id }, config.SECRET, {
        expiresIn: "30d"
      });

      console.log(token);

      return res.json({
        msg: token,
        success: true,
        user: savedUser
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  user_login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.header);

      // Check if email is in DB
      const findUser = await User.findOne({ email: email });

      // If no user exist
      if (!findUser) {
        return res.json({
          msg: "Incorrect login details",
          success: false
        });
      }

      // Compare user password
      const verifyPass = await argon2.verify(findUser.password, password);

      if (!verifyPass) {
        return res.json({
          msg: "Incorrect login details",
          success: false
        });
      }

      const token = jwt.sign(
        {
          userId: findUser._id,
          Email: findUser.email,
          FullName: findUser.full_name
        },
        config.SECRET,
        {
          expiresIn: "30d"
        }
      );

      return res.json({
        msg: token,
        success: true
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // Fetch logged in user profile
  get_profile: async (req, res) => {
    try {
      return res.json({
        user: req.user
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  },

  // Update user profile
  update_profile: async (req, res) => {
    try {
      // console.log(req.user);
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true
      });

      return res.json({
        msg: "Profile updated Successfully",
        success: true,
        user: updatedUser
      });
    } catch (err) {
      return res.json({ err: err.message });
    }
  }
};
