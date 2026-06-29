import { Link } from "react-router-dom";
import "../../css/mainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Task Tracker</p>
          <h1>Плануй свої задачі легко</h1>
          <p className="hero-text">
            Створюй задачі, виставляй пріоритети, контролюй дедлайни та
            відстежуй свій прогрес в одному місці.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/tasks" className="primary-btn">
            Перейти до задач
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
