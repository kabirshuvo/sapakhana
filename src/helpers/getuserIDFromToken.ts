import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getuserIDFromToken = (request: NextRequest) => {
  try {
    // Get the token from the request cookies and cast it to a string
    const token = String(request.cookies.get("token")?.value || "");

    // Verify and decode the token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Return the decoded user ID
    return decodedToken.id;
  } catch (error: any) {
    // If an error occurs during token verification or decoding, throw an error
    throw new Error(error.message);
  }
};
