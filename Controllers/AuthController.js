import UserModel from "../Models/UserModel.js";
import { hashPassword, compareHashedPassword } from "../Utils/HashUtils.js";

// Create a user
export const registerUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Request body is empty');
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
    console.log('New user created successfully');
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Request body is empty');
    res.status(500).json({ message: 'Request body is empty' });
    return;
  }

  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const correctPassword = await compareHashedPassword(password, user.password);
      if (correctPassword) {
        console.log('User logged in successfully');
        console.log(user);
        res.status(200).json(user);
      } else {
        console.error('Wrong credentials');
        res.status(401).json({ message: 'Wrong credentials' });
      }
    } else {
      console.error('Wrong credentials');
      res.status(401).json({ message: 'Wrong credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
