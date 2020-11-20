import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const url = process.env.DB_URL;

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (err) {
  throw err;
}

mongoose.connection.on("connected", () => {
  console.log(`Connected to database ${url}`);
});

mongoose.connection.on("error", (err) => {
  throw err;
});

// To Remove moongoose depreciation warnings
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
