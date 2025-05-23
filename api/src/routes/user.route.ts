import express from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /users/profile/{user_id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the user
 *         example: 123e4567-e89b-12d3-a456-426614174001
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174001
 *                     username:
 *                       type: string
 *                       example: student1
 *                     email:
 *                       type: string
 *                       example: student@school.com
 *                     first_name:
 *                       type: string
 *                       nullable: true
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       nullable: true
 *                       example: Doe
 *                     role:
 *                       type: string
 *                       example: Student
 *                     school_id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     is_approved:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.get(
  "/profile/:user_id",
  authMiddleware,
  userController.getUserController
);

/**
 * @swagger
 * /users/profile/{user_id}:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the user
 *         example: 123e4567-e89b-12d3-a456-426614174001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 nullable: true
 *                 example: student1_updated
 *               email:
 *                 type: string
 *                 format: email
 *                 nullable: true
 *                 example: student_updated@school.com
 *               first_name:
 *                 type: string
 *                 maxLength: 50
 *                 nullable: true
 *                 example: John Updated
 *               last_name:
 *                 type: string
 *                 maxLength: 50
 *                 nullable: true
 *                 example: Doe
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174001
 *                     username:
 *                       type: string
 *                       example: student1_updated
 *                     email:
 *                       type: string
 *                       example: student_updated@school.com
 *                     first_name:
 *                       type: string
 *                       nullable: true
 *                       example: John Updated
 *                     last_name:
 *                       type: string
 *                       nullable: true
 *                       example: Doe
 *                     role:
 *                       type: string
 *                       example: Student
 *                     school_id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     is_approved:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.patch(
  "/profile/:user_id",
  authMiddleware,
  userController.updateUserController
);

export default router;
