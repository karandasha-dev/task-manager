import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateAvatar,
  updateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", uploadAvatar.single("avatar"), registerUser);
router.post("/login", loginUser);

router.get("/me", verifyToken, getMe);
router.patch("/me", verifyToken, updateUser);

router.patch(
  "/avatar",
  verifyToken,
  uploadAvatar.single("avatar"),
  updateAvatar,
);

export default router;
