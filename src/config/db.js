import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const url =
  "mongodb+srv://greatchinex:12220047@mycluster-9furg.gcp.mongodb.net/projaro?retryWrites=true&w=majority";

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
