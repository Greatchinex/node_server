import jwt from "jsonwebtoken";

// Models
import User from "../models/user";

// Config
import config from "./config";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    // console.log("Token below");
    // console.log(token);

    // Bearer "kndijijijijrkjnuburbuhruhuirhrubrhy" "yryry"
    // [
    //     Bearer,
    //     "kndijijijijrkjnuburbuhruhuirhrubrhy",
    //     "yryry"
    // ]

    const decoded = jwt.verify(token, config.SECRET);

    // console.log("Decoded below");
    // console.log(decoded);

    const user = await User.findById(decoded.userId).select({ password: 0 });

    if (!user) {
      throw new Error(); // Fires the code inside the catch block....
    }

    req.user = user;

    next();
  } catch (err) {
    res.json({ msg: "Not Authorized" });
  }
};
