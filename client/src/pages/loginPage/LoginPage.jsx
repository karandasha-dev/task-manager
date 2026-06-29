import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../authRedux/authThunk";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      nav("/tasks");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Вхід</h2>

        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Увійти</button>
        <p>
          Немає аккаунту? <NavLink to={"/register"}>Зареєструйтесь</NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
