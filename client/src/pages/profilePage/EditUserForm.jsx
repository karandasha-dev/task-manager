import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../authRedux/authThunk";

const EditUserForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
  successMessage,
  setSuccessMessage,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const userData = {
      first_name: firstName,
      last_name: lastName,
    };

    if (password.trim()) {
      userData.password = password;
    }

    const result = await dispatch(updateUser(userData));

    if (updateUser.fulfilled.match(result)) {
      setPassword("");
      setSuccessMessage("Дані профілю оновлено");
    }
  };

  return (
    <div className="profile-form-wrapper">
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label> Нове ім'я</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder="Ім'я"
        />

        <label>Нове прізвище</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Прізвище"
        />

        <label>Новий пароль</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Пароль"
        />

        <button type="submit">Зберегти зміни</button>
        {successMessage && <p className="profile-success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EditUserForm;
