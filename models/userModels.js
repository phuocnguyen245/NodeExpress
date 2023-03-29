import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    otp_enabled: {
      type: Boolean,
      default: false
    },
    base32: {
      type: String,
      default: ''
    },
    otpauth_url: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model(
  "users",
  userSchema
);
