const router = require("express").Router();
const User = require("../models/AllUser");
//search user
router.get("/", async (req, res) => {
    try{
      const search = await User.find({ name:{$regex: req.query.texts} })
          res.status(200).json(search);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  });
module.exports = router;