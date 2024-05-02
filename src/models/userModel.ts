import mongoose, { Document, Model } from "mongoose";

// Define IUser interface...
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// Define UserDocument type as an alias for Document & IUser
export type UserDocument = Document & IUser;

const UserSchema = new mongoose.Schema<IUser>(
  {
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
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Add a unique index to the email field for faster lookups
UserSchema.index({ email: 1 }, { unique: true });

// Define a virtual property for the user's full name
UserSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// Define a pre-save hook to hash the user's password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    // Hash password logic here
  }
  next();
});

interface IUserModel extends Model<UserDocument> {}

const User: IUserModel =
  mongoose.models.users ||
  mongoose.model<UserDocument, IUserModel>("User", UserSchema);

export default User;
