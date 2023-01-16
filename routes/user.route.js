const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

userRouter.post("/register", async (req, res) => {
     const { name, email, gender, password } = req.body;
     const email_present = await UserModel.find({ email });
     if (email_present?.email) {
          res.send("Email Already Exist");
     } else {
          try {
               bcrypt.hash(password, 5, async (err, hash) => {
                    const user = new UserModel({
                         name,
                         email,
                         gender,
                         password: hash,
                         gender,
                    });
                    await user.save();
                    res.send({ msg: "Register Successfully" });
               });
          } catch (error) {
               console.log("Something Error in Registring");
               console.log("error:", error);
          }
     }
});
userRouter.post("/login", async (req, res) => {
     const { email, password } = req.body;

     try {
          const user = await UserModel.find({ email });
          if (user.length > 0) {
               const hashed_password = user[0].password;
               bcrypt.compare(password, hashed_password, (err, result) => {
                    if (result) {
                         const token = jwt.sign(
                              { userID: user[0]._id },
                              "masai"
                         );
                         res.send({ msg: "Login Successfull", token: token });
                    } else {
                         res.send({ msg: "Login Failed" });
                    }
               });
          }
     } catch (error) {
          console.log("Something Error in Login");
          console.log("error:", error);
     }
});

module.exports = {
     userRouter,
};
