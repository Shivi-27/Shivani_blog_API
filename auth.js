const router = require("express").Router();
const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecreat } = require("../utilities").constants;

//Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;
    if (!name || !email || !password || !phone || !userType)
      return res.status(400).json("invalid request!");

    let emailUser = await userSchema.findOne({ email });
    if (emailUser) return res.status(400).json("Eamil Already exists!");

    let phoneUser = await userSchema.findOne({ phone });
    if (phoneUser) return res.status(400).json("Phone Already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new userSchema({
      name: name,
      email: email,
      password: hashedPass,
      phone: phone,
      userType: userType,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("invalid request!");

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(400).json("User doesn't exists!");

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) return res.status(400).json("Invalid Password!");
    const { password: newPassword, ...others } = user._doc;
    
    const token = await jwt.sign(
      { _id: others._id, userType: others.userType },
      jwtSecreat
    );
    res.json(200, { others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
