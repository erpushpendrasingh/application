const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
     const token = req.headers?.authorization.split(" ")[1];
     if (token) {
          const decode = jwt.verify(token, "masai");
          if (decode) {
               const userID = decode.userID;
               req.body.userID = userID;
               next();
          } else {
               res.send("plese Login Again");
          }
     } else {
          res.send({ msg: "Please Login First" });
     }
};

module.exports = {
     authentication,
};
