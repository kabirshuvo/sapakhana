import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Prepare response
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
