"use server";

import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

export async function getPosts() {
  try {
    await connect();
    return { message: "GET" };
  } catch (error: any) {
    return { errMsg: error.message };
  }
}
