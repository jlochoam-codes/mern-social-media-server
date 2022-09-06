import UserModel from "../Models/UserModel.js";
import { hashPassword } from "../Utils/HashUtils.js";

// Get a user
export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (user) {
      // Remove password from response
      const { password, ...userWithoutPw } = user._doc; // Make mongoose Model behave as object
      res.status(200).json(userWithoutPw);
    } else {
      res.status(404).json({ message: `User with id ${userId} NOT found` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const updatingUserId = req.params.id;
  const { requesterUserId, password } = req.body;

  // If a user wants to update its own profile, allow updates
  if (updatingUserId === requesterUserId) {
    // If a user wants to update password, it must be hashed first
    if (password) {
      const hashedPassword = await hashPassword(password);
      req.body.password = hashedPassword;
    }

    try {
      const user = await UserModel.findByIdAndUpdate(updatingUserId, req.body, {
        new: true // Retrieve updated user, NOT user before the updates
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: `Unauthorized to update user with id ${updatingUserId}` });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const deletingUserId = req.params.id;
  const { requesterUserId } = req.body;

  // If a user wants to delete its own profile, allow delete
  if (deletingUserId === requesterUserId) {
    try {
      await UserModel.findByIdAndDelete(deletingUserId);
      res.status(200).json({ message: `Deleted user with id ${deletingUserId}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: `Unauthorized to delete user with id ${deletingUserId}` });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const userToFollowId = req.params.id;
  const { requesterUserId } = req.body;

  // A user cannot follow itself
  if (userToFollowId === requesterUserId) {
    res.status(403).json({ message: 'Action forbidden, a user cannot follow itself' });
  } else try {
    const userToFollow = await UserModel.findById(userToFollowId);
    const userFollowing = await UserModel.findById(requesterUserId);

    // If the requester does not follow the user already:
    if (!userToFollow.followers.includes(requesterUserId)) {
      await userToFollow.updateOne({ $push: { followers: requesterUserId } });
      await userFollowing.updateOne({ $push: { following: userToFollowId } });
      res.status(200).json({ message: `Followed user with id ${userToFollowId}` });
    } else res.status(403).json({ message: 'Action forbidden, user is already followed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const userToUnfollowId = req.params.id;
  const { requesterUserId } = req.body;

  // A user cannot unfollow itself
  if (userToUnfollowId === requesterUserId) {
    res.status(403).json({ message: 'Action forbidden, a user cannot unfollow itself' });
  } else try {
    const userToUnfollow = await UserModel.findById(userToUnfollowId);
    const userUnfollowing = await UserModel.findById(requesterUserId);

    // If the requester follows the user:
    if (userToUnfollow.followers.includes(requesterUserId)) {
      await userToUnfollow.updateOne({ $pull: { followers: requesterUserId } });
      await userUnfollowing.updateOne({ $pull: { following: userToUnfollowId } });
      res.status(200).json({ message: `Unfollowed user with id ${userToUnfollowId}` });
    } else res.status(403).json({ message: 'Action forbidden, user is not followed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
