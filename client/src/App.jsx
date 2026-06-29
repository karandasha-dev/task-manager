import TasksPage from "./pages/tasksPage/TasksPage";
import MainPage from "./pages/mainPage/MainPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import "./css/general.css";
import "./css/responsive.css";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage.jsx/RegisterPage";
function App() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
