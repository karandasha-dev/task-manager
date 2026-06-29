import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTasks } from "../../tasksRedux/taskThunk.js";

const EditTaskForm = ({ task, setEditId }) => {
  const [editForm, setEditForm] = useState(task);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateTasks({ id: task.id, updatedTask: editForm }));
    setEditId(null);
  };

  return (
    <div className="task-form-wrapper">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-header">
          <h2>Редагувати завдання</h2>
          <p>Зміни дані цього завдання</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Назва завдання</label>
            <input
              value={editForm.title}
              name="title"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Опис завдання</label>
            <input
              value={editForm.description}
              name="description"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Статус завдання</label>
            <select
              value={editForm.status}
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
              value={editForm.priority}
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
            value={editForm.deadline || ""}
            name="deadline"
            onChange={handleChange}
            type="date"
          />
        </div>

        <button className="submit-task-btn" type="submit">
          Оновити задачу
        </button>

        <button
          className="submit-task-btn"
          type="button"
          onClick={() => setEditId(null)}
        >
          Скасувати
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
