import mongoose, { Document, Model } from "mongoose";

// Define interface for post document
interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define PostDocument type as an alias for Document & IPost
export type PostDocument = Document & IPost;

// Define Post schema
const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields automatically
  }
);

// Create Post model
interface IPostModel extends Model<IPost> {}

const Post: IPostModel =
  mongoose.models.posts || mongoose.model<IPost>("Post", PostSchema);

// console.log(Post);
export default Post;
