import pool from "../config/db.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [userId],
    );

    res.status(200).json(tasks.rows);
  } catch (error) {
    console.log("ПОМИЛКА GET TASKS:", error.message);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } = req.body;

    const userId = req.user.id;

    const newTask = await pool.query(
      `INSERT INTO tasks 
      (title, description, status, priority, deadline, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [title, description, status, priority, deadline, userId],
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.log("ПОМИЛКА POST TASKS:", error.message);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user.id;

    const { title, description, status, priority, deadline } = req.body;

    const updatedTask = await pool.query(
      `UPDATE tasks 
      SET title = $1, description = $2, status = $3, priority = $4, deadline = $5 
      WHERE id = $6 AND user_id = $7 
      RETURNING *`,
      [title, description, status, priority, deadline, taskId, userId],
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    console.log("ПОМИЛКА PATCH TASKS:", error.message);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user.id;

    const deletedTask = await pool.query(
      `DELETE FROM tasks 
      WHERE id = $1 AND user_id = $2 
      RETURNING *`,
      [taskId, userId],
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json({
      message: "task deleted",
      id: taskId,
    });
  } catch (error) {
    console.log("ПОМИЛКА DELETE TASKS:", error.message);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};
