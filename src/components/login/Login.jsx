import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/UserService";
import { useAppContext } from "../context/AuthProvider";

export const Login = (props) => {
  const { setCurrentUser } = useAppContext();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitUserInput = (e) => {
    e.preventDefault();

    loginUser(userInput).then((res) => {
      console.log("Response from login:", res);

      if (res.refresh && res.access && res.user_id) {
        localStorage.setItem("access", res.access);
        localStorage.setItem("refresh", res.refresh);
        localStorage.setItem("user_id", res.user_id);

        // Store user object with id property instead of just the ID
        setCurrentUser({
          id: res.user_id,
          email: userInput.email,
        });

        console.log("User logged in successfully:", {
          id: res.user_id,
          email: userInput.email,
        });

        navigate("/");
      } else {
        alert("Login failed");
      }
    });
  };

  const handleInputChange = (e) => {
    const copy = { ...userInput };
    copy[e.target.id] = e.target.value;
    setUserInput(copy);
  };
  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={submitUserInput}>
          <h1 className="facebook">fakebook</h1>
          <p>Time to connect with people you never otherwise would! </p>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
                autoFocus
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <button className="login-btn btn-info" type="submit">
              Log in
            </button>
            <button className="forgot-password">Forgot password?</button>
            <button className="create-account">
              <Link to="/register">Create an account</Link>
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
