import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    maritalStatus: {
      type: String,
      default: '',
    },
    followers: [],
    following: [],
  },
  { timestamps: true } // Each document in a collection will automatically have 'createdAt' and 'updatedAt'
);

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
