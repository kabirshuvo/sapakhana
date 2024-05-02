"use client";
import React, { useEffect, useState } from "react";
import { getPosts } from "@/_actions/postActions";
import Post, { PostDocument } from "@/models/postModel";

const PostPage = () => {
  const [posts, setPosts] = useState<PostDocument[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res: { data?: PostDocument[]; errMsg?: any } = await getPosts();
        if (res.data) {
          setPosts(res.data);
        } else {
          console.error("Error fetching posts:", res.errMsg);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      {/* Render posts here */}
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
