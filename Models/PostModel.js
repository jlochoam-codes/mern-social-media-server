import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    img: { type: String, default: '' },
    desc: { type: String, required: true },
    likes: [String],
  },
  { timestamps: true }
);

const PostModel = mongoose.model('posts', PostSchema);

export default PostModel;
