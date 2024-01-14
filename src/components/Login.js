// Library imports
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Internal imports
import ToastConfig from "./utils/utils";

// Static imports
import logoImage from "../image/Logo.svg";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logMeIn(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/auth/login",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        const data = response;
        const username = data.data.user.username;
        console.log(data);
        toast.success(data.data.msg, ToastConfig);
        props.setToken(data.data.access_token);
        localStorage.setItem("userName", username);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });

    setloginForm({
      email: "",
      password: "",
    });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <div>
      <ToastContainer />
      <a className="brand-logo" href="/">
        <img className="logo" src={logoImage} />
        <div className="brand-logo-name">
          <strong> ToDo </strong>
        </div>
      </a>

      <div className="login">
        <form className="p-3 border border-2">
          <div className="Login-Header">
            <h4 className="mb-5">Login</h4>
          </div>

          <p>
            <label>Email</label>
            <input
              className="loginEmailBox"
              onChange={handleChange}
              type="email"
              text={loginForm.email}
              name="email"
              placeholder="Email"
              size="32"
              value={loginForm.email}
            ></input>
          </p>
          <p>
            <label>Password</label>
            <input
              className="loginPwordBox"
              onChange={handleChange}
              type="password"
              text={loginForm.password}
              name="password"
              placeholder="Password"
              size="32"
              value={loginForm.password}
            ></input>
          </p>
          <p className="loginCheckBox">
            <label>Remember me</label>
            <input type="checkbox"></input>
          </p>
          <div className="loginbtn">
            <button onClick={logMeIn} className="btn btn-primary mt-3">
              Sign In
            </button>
          </div>
        </form>
        <div className="logged_in">
          <span>Don&lsquo;t have an account yet? </span>
          <a href="/register">
            <i className="fa fa-hand-o-right" aria-hidden="true"></i>Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
