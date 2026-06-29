import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
import "../../css/profile.css";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { user, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Профіль користувача</h2>

        {user && (
          <div className="profile-info">
            <p>
              <strong>Ім'я:</strong> {user.first_name}
            </p>

            <p>
              <strong>Прізвище:</strong> {user.last_name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Закрити форму" : "Змінити дані профілю"}
            </button>
          </div>
        )}
        <div>
          {isOpen && (
            <EditUserForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              password={password}
              setPassword={setPassword}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
