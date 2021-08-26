const router = require("express").Router();
const userSchema = require("../models/userModel");
const postSchema = require("../models/postModel");
const categorySchema = require("../models/categoryModel");
const jwt = require("jsonwebtoken");
const { verifyAuther, verifyUser } = require("../middleware");
//create post
router.post("/", verifyAuther, async (req, res) => {
  try {
    const { category, title, article } = req.body;
    const userId = req.user._id;
    if (!category || !title || !article) {
      return res.status(401).json("Invalid request");
    }

    let categoryData = await categorySchema.findOne({ name: category });
    if (!categoryData) {
      categoryData = await categorySchema.create({ name: category });
    }
    let postData = {
      userId,
      title,
      article,
      categoryId: categoryData._id,
    };
    const savePost = await postSchema.create(postData);
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all data

router.get("/", verifyUser, async (req, res) => {
  try {
    const { category } = req.query;
    const { userType, _id: userId } = req.user;

    let categoryData = await categorySchema.findOne({ name: category });
    let criteria = {};
    userType == "AUTHER" ? (criteria.userId = userId) : true;
    category && categoryData ? (criteria.categoryId = categoryData._id) : true;
    let posts = await postSchema
      .find(criteria)
      .populate("userId categoryId", "name");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
