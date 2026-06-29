import { useState } from "react";
import { createUser } from "../../authRedux/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [avatar, setAvatar] = useState("");

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT СПРАЦЮВАВ");
    console.log({
      first_name,
      last_name,
      email,
      password,
      avatar,
    });

    const registered = await dispatch(
      createUser({ password, email, first_name, last_name, avatar }),
    );

    console.log("REGISTERED RESULT:", registered);

    if (createUser.fulfilled.match(registered)) {
      nav("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Реєстрація</h2>

        <input
          placeholder="Name"
          value={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
        />
        <input
          placeholder="Last name"
          value={last_name}
          onChange={(e) => setlast_name(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

        <button type="submit">Зареєструватись</button>
      </form>
    </div>
  );
};

export default RegisterPage;
