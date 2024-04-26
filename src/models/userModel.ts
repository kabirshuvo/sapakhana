import mongoose, { Document, Model } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// Define the mongoose model for the user
const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Define the User model type
interface IUserModel extends Model<IUser> {}

// Create the User model from the schema
const UserModel: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
