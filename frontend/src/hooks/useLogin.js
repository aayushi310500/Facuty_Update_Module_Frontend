import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/apiLogin";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      sessionStorage.setItem("token", token);

      // Decode JWT to extract user ID
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.employee_id;
      sessionStorage.setItem("userId", userId);

      navigate(`/employee/${userId}`);
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
