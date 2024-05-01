import { getuserIDFromToken } from "@/helpers/getuserIDFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User, { UserDocument } from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // Extract user ID from the JWT token in the request cookies
    const userId = await getuserIDFromToken(request);

    // Find the user by ID and exclude the password field
    const user = await User.findOne({ _id: userId }).select("-password");

    // Return the user data in the response
    return NextResponse.json({
      message: "Congratulations, User founded;",
      data: user,
    });
  } catch (error: any) {
    // If an error occurs, return an error response
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
