import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTasks } from "../../tasksRedux/taskThunk.js";
import "../../css/taskForm.css";

const TasksForm = () => {
  const [formTasks, setFormTasks] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    deadline: "",
  });

  const { loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formTasks.title.trim() ||
      !formTasks.status.trim() ||
      !formTasks.priority.trim() ||
      !formTasks.deadline.trim()
    ) {
      return;
    }

    dispatch(createTasks(formTasks));
    setFormTasks({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      deadline: "",
    });
  };

  const handleChange = (e) => {
    setFormTasks({ ...formTasks, [e.target.name]: e.target.value });
  };

  return (
    <div className="task-form-wrapper">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Додати завдання</h2>
          <p>Заповни інформацію про нову задачу</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Назва завдання</label>
            <input
              value={formTasks.title}
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Наприклад: Вивчити React Router"
            />
          </div>

          <div className="form-group">
            <label>Опис завдання</label>
            <textarea
              value={formTasks.description}
              name="description"
              onChange={handleChange}
              placeholder="Коротко опиши задачу..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Статус завдання</label>
              <select
                value={formTasks.status}
                onChange={handleChange}
                name="status"
              >
                <option value="">Оберіть статус</option>
                <option value="todo">Треба зробити</option>
                <option value="in_progress">В роботі</option>
                <option value="done">Виконано</option>
              </select>
            </div>

            <div className="form-group">
              <label>Пріорітет завдання</label>
              <select
                value={formTasks.priority}
                onChange={handleChange}
                name="priority"
              >
                <option value="">Оберіть статус</option>
                <option value="low">Низький</option>
                <option value="medium">Середній</option>
                <option value="high">Високий</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Дедлайн завдання</label>
            <input
              value={formTasks.deadline}
              name="deadline"
              onChange={handleChange}
              type="date"
            />
          </div>
        </div>

        <button className="submit-task-btn" type="submit">
          Додати задачу
        </button>
      </form>
    </div>
  );
};

export default TasksForm;
