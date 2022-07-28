import UserModel from "../Models/UserModel.js";

// Create a user
export const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new UserModel({
    username,
    password,
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
