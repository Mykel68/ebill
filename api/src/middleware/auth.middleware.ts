import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.util";
import { AppError } from "../utils/error.util";

export interface AuthRequest extends Request {
  user?: {
    user_id: string;
    first_name: string;
    last_name: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    sendResponse(res, 401, { message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
      first_name: string;
      last_name: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    sendResponse(res, 401, { message: "Unauthorized: Invalid token" });
  }
};

export const verify_X_API_KEY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let apiKeyHeader = req.headers["x-api-key"];

    // Ensure apiKeyHeader is a string
    if (Array.isArray(apiKeyHeader)) {
      apiKeyHeader = apiKeyHeader[0];
    }

    if (!apiKeyHeader) {
      sendResponse(res, 401, { message: "Unauthorized: No API key provided" });
      return;
    }

    // Extract the actual API key (if prefixed with 'Bearer ')
    const apiKey = apiKeyHeader.startsWith("Bearer ")
      ? apiKeyHeader.split(" ")[1]
      : apiKeyHeader;

    if (apiKey !== process.env.X_API_KEY!) {
      sendResponse(res, 401, { message: "Unauthorized: Invalid API key" });
      return;
    }

    next();
  } catch (error: any) {
    throw new AppError(error.message, 401);
  }
};

//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     let session_id =
//       req.params.session_id || req.body.session_id || req.query.session_id;

//     if (session_id && !validateUUID(session_id)) {
//       throw new AppError("Invalid session ID", 400);
//     }

//     if (!session_id) {
//       // Infer current session
//       const currentDate = new Date();
//       const session = await Session.findOne({
//         where: {
//           school_id: req.user!.school_id,
//           start_date: { [Op.lte]: currentDate },
//           end_date: { [Op.gte]: currentDate },
//         },
//       });

//       if (!session) {
//         throw new AppError("No active session found for this school", 400);
//       }
//       session_id = session.session_id;
//     }

//     const session = await Session.findOne({
//       where: { session_id, school_id: req.user!.school_id },
//     });

//     if (!session) {
//       throw new AppError(
//         "Session not found or does not belong to this school",
//         404
//       );
//     }

//     req.session = session;
//     next();
//   };
// };
