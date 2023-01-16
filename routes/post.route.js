const express = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
     try {
          const post = await PostModel.find();
          res.send(post);
     } catch (error) {
          console.log("Somthing Error in /post");
          console.log("error:", error);
     }
});

postRouter.post("/create", async (req, res) => {
     const payload = req.body;
     try {
          const new_post = new PostModel(payload);
          await new_post.save();
          res.send({ msg: "Post is created" });
     } catch (error) {
          console.log("error:", error);
          res.send({ msg: error });
     }
});

postRouter.patch("/update/:postID", async (req, res) => {
     let userID = req.body.userID;
     let postID = req.params.postID;
     let payload = req.body;
    const posts = await PostModel.findOne({ _id: postID });
    const userID_in_post = posts.userID
    const userID_making_req=req.body.userID
     try {
          if (userID_making_req == userID_in_post) {
               res.send({ msg: "NOT AUTHORIZED" });
          } else {
               await PostModel.findByIdAndUpdate({ _id: postID }, payload);
               res.send({ msg: "Posts Updated successfully" });
          }
     } catch (error) {
          console.log("error:", error);
          res.send({ msg: "somthing error in updating" });
     }
});

postRouter.delete("/delete/:postID", async (req, res) => {
     let postID = req.params.postID;

     try {
          await PostModel.findByIdAndDelete({ _id: postID });
          res.send("Deleted the Post");
     } catch (error) {
          console.log("error:", error);
          res.send({ msg: "somthing error in deleting" });
     }
});

module.exports = {
     postRouter,
};
