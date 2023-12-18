import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const APP_SECRET = process.env.APP_SECRET;
const APP_SECRET_R = process.env.APP_SECRET_R;

export const GetSalt = async () => {
  return await bcrypt.genSalt();
};

export const GetHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GetHashedPassword(enteredPassword, salt)) == savedPassword;
};

export const GetToken = (
  { user_id, email, phone, country_code, user_type }: UserModel,
  type: "authorization" | "refresh"
) => {
  const tokenData = {
    user_id,
    email,
    country_code,
    phone,
    user_type,
  };

  let expiresIn = "1d";

  let secret = APP_SECRET;

  if (type === "refresh") {
    expiresIn = "5d";
    secret = APP_SECRET_R;
  }

  return jwt.sign(tokenData, secret, {
    expiresIn,
  });
};
