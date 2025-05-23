import bcrypt from "bcrypt";
import User from "../models/user.model";
import { UserAttributes, UserInstance } from "../types/models.types";
import { AppError } from "../utils/error.util";
import { validateUUID } from "../utils/validation.util";

export const getUserById = async (user_id: string): Promise<UserInstance> => {
  if (!validateUUID(user_id)) throw new AppError("Invalid user ID", 400);

  const user = await User.findByPk(user_id);
  if (!user) throw new AppError("User not found", 404);
  return user as UserInstance;
};

export const updateUser = async (
  user_id: string,
  updates: Partial<UserAttributes>
): Promise<UserInstance> => {
  if (!validateUUID(user_id)) throw new AppError("Invalid user ID", 400);

  const user = await User.findByPk(user_id);
  if (!user) throw new AppError("User not found", 404);

  if (updates.username && updates.username !== user.username) {
    const existingUser = await User.findOne({
      where: { username: updates.username },
    });
    if (existingUser) throw new AppError("Username already exists", 400);
  }

  if (updates.email && updates.email !== user.email) {
    const existingEmail = await User.findOne({
      where: { email: updates.email },
    });
    if (existingEmail) throw new AppError("Email already exists", 400);
  }

  await user.update(updates);
  return user as UserInstance;
};

export const deleteUser = async (user_id: string): Promise<void> => {
  if (!validateUUID(user_id)) throw new AppError("Invalid user ID", 400);

  const user = await User.findByPk(user_id);
  if (!user) throw new AppError("User not found", 404);

  await user.destroy();
};
