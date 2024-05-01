import { NextRequest, NextResponse } from "next/server";
import User, { UserDocument } from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    const { connect } = await import("@/dbConfig/dbConfig");
    connect();

    // Parse request body
    const requestBody: { token: string } = await request.json();
    const { token } = requestBody;

    // Find user by verification token
    const user: UserDocument | null = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update user as verified
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "User verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred while verifying user" },
      { status: 500 }
    );
  }
}
