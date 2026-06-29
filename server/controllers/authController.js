import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, password, email } = req.body;

    if (!first_name || !last_name || !password || !email) {
      return res.status(400).json({ message: "Заповніть всі поля" });
    }

    const userEmail = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userEmail.rows.length) {
      return res.status(409).json({
        message: "Користувач існує",
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const avatarURL = req.file ? `/uploads/avatars/${req.file.filename}` : null;

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, password_hash, email, avatar_url) VALUES($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, avatar_url, created_at",
      [first_name, last_name, password_hash, email, avatarURL],
    );
    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    console.log("REGISTER ERROR MESSAGE:", error.message);

    return res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("BODY LOGIN:", req.body);

    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "Заповніть всі поля" });
    }

    const userEmailResult = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );

    if (userEmailResult.rows.length === 0) {
      return res.status(404).json({ message: "Користувача не існує" });
    }

    const user = userEmailResult.rows[0];

    const isPswValid = await bcrypt.compare(password, user.password_hash);
    if (!isPswValid) {
      return res.status(400).json({
        message: "Невірний email або пароль",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Помилка сервера" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userResult = await pool.query(
      "SELECT id, first_name, last_name, email, avatar_url, created_at FROM users WHERE id = $1",
      [req.user.id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    return res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.log("get me error:", error.message);
    return res
      .status(500)
      .json({ message: "Помилка сервера", error: error.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Файл не завантажено" });
    }

    const avatarURL = `/uploads/avatars/${req.file.filename}`;

    const updetedUser = await pool.query(
      "UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, first_name, last_name, email, avatar_url, created_at",
      [avatarURL, req.user.id],
    );

    return res.status(200).json(updetedUser.rows[0]);
  } catch (error) {
    console.log("updated error:", error.message);

    return res
      .status(500)
      .json({ message: "Помилка сервера", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, password } = req.body;
    const userId = req.user.id;

    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const user = userResult.rows[0];

    let newFirstName = user.first_name;
    let newLastName = user.last_name;
    let newPasswordHash = user.password_hash;

    if (first_name !== undefined) {
      if (!first_name.trim()) {
        return res.status(400).json({ message: "Ім'я не може бути порожнім" });
      }
      newFirstName = first_name.trim();
    }

    if (last_name !== undefined) {
      if (!last_name.trim()) {
        return res.status(400).json({ message: "Ім'я не може бути порожнім" });
      }
      newLastName = last_name.trim();
    }

    if (password !== undefined) {
      if (!password.trim()) {
        return res
          .status(400)
          .json({ message: "Пароль не може бути порожнім" });
      }
      newPasswordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await pool.query(
      "UPDATE users SET first_name=$1, last_name=$2, password_hash = $3 WHERE id = $4 RETURNING id, first_name, last_name, email",
      [newFirstName, newLastName, newPasswordHash, userId],
    );

    return res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.log("ПОМИЛКА UPDATE USER:", error);
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};
