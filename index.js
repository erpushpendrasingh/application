const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");

require("dotenv").config();

const app = express();
const cors = require("cors");
const { postRouter } = require("./routes/post.route");
const { authentication } = require("./middlewares/auth.middleware");
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
     res.send("Welcome to EV-4");
});
app.use("/user", userRouter);
// app.use(authentication);
app.use("/post", postRouter);

app.listen(process.env.port, async () => {
     try {
          await connection;
          console.log("SUCCESSFULL CONNECTED TO DB");
     } catch (error) {
          console.log("SOMETHING WENT WRONG");
          console.log("error:", error);
     }
     console.log(`Listening on port ${process.env.port}`);
});
