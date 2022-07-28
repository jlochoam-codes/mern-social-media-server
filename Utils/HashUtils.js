import bcrypt from 'bcrypt';

export const hashPassword = async pw => {
  const salt = await bcrypt.genSalt(10); // Salt of 10 rounds
  return bcrypt.hash(pw, salt);
};

export const compareHashedPassword = async (plainPw, hashedPw) => {
  return bcrypt.compare(plainPw, hashedPw);
};
