import Login from "../models/Login.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let login = await Login.findOne({
      username: username,
    });
    if (!login) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    const payload = {
      login: {
        id: login.id,
        userType: login.userType,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    let login = await Login.findOne({
      username: username,
    });
    if (!login) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    login.password = await bcrypt.hash(newPassword, salt);
    await Login.findOneAndUpdate({ username: username }, { password: login.password });
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
