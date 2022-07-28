import bcrypt from 'bcrypt';
import UserModel from "../Models/UserModel.js";

const hashPassword = async pw => {
  const salt = await bcrypt.genSalt(10); // Salt of 10 rounds
  return bcrypt.hash(pw, salt);
};

// Create a user
export const registerUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(500).json({ message: 'Request body is empty' });
    return;
  }

  const { username, password, firstName, lastName } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
