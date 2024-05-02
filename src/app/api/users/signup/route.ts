import { connect } from "@/dbConfig/dbConfig";
import User, { UserDocument } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Define interface for request body
interface RequestBody {
  username: string;
  email: string;
  password: string;
}

// Define interface for response
interface ResponseBody {
  message: string;
  success: boolean;
  savedUser?: UserDocument;
  error?: string;
}

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: RequestBody = await request.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      const response: ResponseBody = {
        error: "User already exists",
        success: false,
        message: "User already exists",
      };
      return NextResponse.json(response, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    const response: ResponseBody = {
      message: "User created successfully",
      success: true,
      savedUser,
    };
    return NextResponse.json(response);
  } catch (error: any) {
    const response: ResponseBody = {
      error: error.message,
      success: false,
      message: "status:500needed",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
