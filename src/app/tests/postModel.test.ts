// Import your Mongoose model
import Post, { PostDocument } from "@/models/postModel";

// Create a new post
async function createPost(
  title: string,
  content: string
): Promise<PostDocument> {
  const post = new Post({ title, content });
  return await post.save();
}

// Find all posts
async function findAllPosts(): Promise<PostDocument[]> {
  return await Post.find();
}

// Test your model
async function testModel() {
  // Create a new post
  const newPost = await createPost("Test Post", "This is a test post content.");
  console.log("Created post:", newPost);

  // Find all posts
  const allPosts = await findAllPosts();
  console.log("All posts:", allPosts);
}

// Run the test
testModel()
  .then(() => {
    console.log("Test completed successfully.");
  })
  .catch((error) => {
    console.error("Error during test:", error);
  });
