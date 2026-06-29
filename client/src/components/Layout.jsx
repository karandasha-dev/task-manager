import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../authRedux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../css/layout.css";
const Layout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-layout">
      <header className="site-header">
        <nav>
          <NavLink to="/">Головна сторінка</NavLink>
          <NavLink to="/tasks">Завдання</NavLink>
          <NavLink to="/profile">Профіль</NavLink>
          <button onClick={handleLogout}>Вийти</button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
