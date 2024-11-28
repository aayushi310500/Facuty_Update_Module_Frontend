import React from "react";
import { useLogin } from "../hooks/useLogin";
import "../css/LoginPage.css";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Login</h3>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
