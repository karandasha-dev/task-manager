import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("uploads", "avatars");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();

    const uniqueName =
      "avatar-" + Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Можна завантажувати лише файли із розширенням jpeg, png та webp",
      ),
      false,
    );
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
