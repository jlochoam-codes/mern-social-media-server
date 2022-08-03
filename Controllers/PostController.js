import PostModel from "../Models/PostModel.js";

// Create a post
export const createPost = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(500).json({ message: 'Request body is empty' });
    return;
  }

  const { userId, img, desc } = req.body;
  const newPost = new PostModel({ userId, img, desc });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a post
export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) res.status(200).json(post);
    else res.status(404).json({ message: `Post with id ${postId} NOT found` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    if (posts) res.status(200).json(posts);
    else res.status(200).json({ message: 'No posts to show... How about you create one?' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId, isUserAdmin } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (post) {
      // If user wants to delete its own post, or if user is admin, allow delete
      if (post.userId === userId || isUserAdmin) {
        await post.deleteOne();
        res.status(200).json({ message: `Deleted post with id ${postId}` });
      } else res.status(403).json({ message: `Unauthorized to delete post with id ${postId}` });
    } else res.status(404).json({ message: `Post with id ${postId} NOT found` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (post) {
      // If user does not already like the post
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json({ message: `User with id ${userId} liked post with id ${postId}` });
      } else res.status(403).json({ message: 'Action forbidden, post already liked by user' });
    } else res.status(404).json({ message: `Post with id ${postId} NOT found` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      // If user likes the post
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json({ message: `User with id ${userId} unliked post with id ${postId}` });
      } else res.status(403).json({ message: 'Action forbidden, post not liked by user' });
    } else res.status(404).json({ message: `Post with id ${postId} NOT found` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
