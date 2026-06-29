import { useState, useEffect } from "react";
import TasksForm from "./TasksForm";
import TasksCard from "./TasksCard";
import EditTaskForm from "./EditTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../tasksRedux/taskThunk.js";
import "../../css/tasksPage.css";
import useFilteredTasks from "../../hooks/useFilteredTasks.js";

const TasksPage = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, list } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredList = useFilteredTasks({
    list,
    searchQuery,
    filterPriority,
    filterStatus,
  });

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="tasks-header">
          <h1 className="tasks-label">Мої задачі</h1>
          <p className="tasks-subtitle">
            Керуй своїми задачами, пріоритетами та дедлайнами.
          </p>
          <button className="add-task-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Закрити форму" : "Додати задачу"}
          </button>
        </div>
      </div>

      <div className="tasks-filters">
        <input
          className="task-search"
          value={searchQuery}
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук задачі..."
        />

        <select
          className="task-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Усі статуси</option>
          <option value="todo">Треба зробити</option>
          <option value="in_progress">В роботі</option>
          <option value="done">Виконано</option>
        </select>

        <select
          className="task-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">Усі пріорітети</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>

      <div className="form-wrapper">{isOpen && <TasksForm />}</div>
      <div>
        {filteredList.map((task) =>
          editId === task.id ? (
            <EditTaskForm setEditId={setEditId} key={task.id} task={task} />
          ) : (
            <TasksCard setEditId={setEditId} key={task.id} task={task} />
          ),
        )}
      </div>
    </div>
  );
};

export default TasksPage;
