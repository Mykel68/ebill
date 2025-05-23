import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { sendResponse } from "../utils/response.util";
import { AppError } from "../utils/error.util";
import Joi from "joi";

const userUpdateSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  first_name: Joi.string().max(50).optional(),
  last_name: Joi.string().max(50).optional(),
});

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id } = req.params;
    const user = await userService.getUserById(user_id);
    sendResponse(res, 200, {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error: any) {
    next(new AppError(error.message, error.statusCode || 404));
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id } = req.params;
    const { error, value } = userUpdateSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const updatedUser = await userService.updateUser(user_id, value);
    sendResponse(res, 200, {
      user_id: updatedUser.user_id,
      username: updatedUser.username,
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
    });
  } catch (error: any) {
    next(new AppError(error.message, error.statusCode || 400));
  }
};

//delete User by id
export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id } = req.params;
    await userService.deleteUser(user_id);
    sendResponse(res, 200, { message: "User deleted successfully" });
  } catch (error: any) {
    next(new AppError(error.message, error.statusCode || 400));
  }
};
