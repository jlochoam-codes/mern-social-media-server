import jwt from 'jsonwebtoken';

export const jwtSign = (user, expiresIn) => {
  return jwt.sign({
    username: user.username, id: user._id
  }, process.env.JWT_KEY, { expiresIn: expiresIn });
};
