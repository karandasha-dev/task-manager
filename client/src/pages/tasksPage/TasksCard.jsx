import "../../css/taskCard.css";
import { updateTasks, deleteTasks } from "../../tasksRedux/taskThunk.js";
import { useDispatch } from "react-redux";

const TasksCard = ({ task, setEditId }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-card">
      <div className="task-card-content">
        <h3 className="task-card-title">Завдання: {task.title}</h3>

        <p className="task-card-description">{task.description}</p>

        <p className="task-card-info">
          Статус: {task.status === "todo" && "Треба зробити"}
          {task.status === "in_progress" && "В роботі"}
          {task.status === "done" && "Виконано"}
        </p>

        <p className="task-card-info">
          Пріорітет: {task.priority === "low" && "Низький"}
          {task.priority === "medium" && "Середній"}
          {task.priority === "high" && "Високий"}
        </p>

        <p className="task-card-info">Дедлайн: {task.deadline}</p>

        <div>
          <button onClick={() => setEditId(task.id)}>Редагувати</button>
          <button onClick={() => dispatch(deleteTasks(task.id))}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksCard;
