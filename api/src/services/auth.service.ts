import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AppError } from "../utils/error.util";
import { UserInstance, UserRegistrationData } from "../types/models.types";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const user: UserInstance | null = await User.findOne({ where: { username } });
  if (!user) throw new AppError("User not found", 404);

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const token = jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  return token;
};

export const registerUser = async (
  userData: UserRegistrationData
): Promise<UserInstance> => {
  const { username, email, password, first_name, last_name } = userData;

  // Check if username or email already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new AppError("Username already taken", 400);
  }

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    throw new AppError("Email already registered", 400);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    username,
    email,
    password_hash,
    first_name,
    last_name,
  });

  return newUser;
};
