// Library imports
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Internal imports
import ToastConfig from "./utils/utils";

// Static imports
import logoImage from "../image/Logo.svg";

function Register(props) {
  const [registerForm, setregisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function registerMe(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/auth/register",
      data: {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
      },
    })
      .then((response) => {
        const data = response;
        toast.success(data.data.msg, ToastConfig);
        props.setToken(response.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });

    setregisterForm({
      username: "",
      email: "",
      password: "",
    });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setregisterForm((prevNote) => ({
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

      <div className="register">
        <form className="p-3 border border-2">
          <div className="Register-Header">
            <h4 className="has-text-centered mb-5 is-size-3">Register</h4>
          </div>

          <p>
            <label>Username</label>
            <input
              className="loginUsernameBox"
              type="text"
              placeholder="username"
              size="32"
            ></input>
          </p>
          <p>
            <label>Email</label>
            <input
              className="loginEmailBox"
              type="text"
              placeholder="email"
              size="64"
            ></input>
          </p>
          <p>
            <label>Password</label>
            <input
              className="loginPwordBox"
              type="password"
              placeholder="password"
              size="32"
            ></input>
          </p>
          <p>
            <label>Confirm Password</label>
            <input
              className="loginPwordBox"
              type="password"
              placeholder="confirm password"
              size="32"
            ></input>
          </p>
          <div className="registerbtn">
            <button className="btn btn-primary mt-3">Register</button>
          </div>
        </form>
        <div className="registered">
          <span>Already registered? </span>
          <a href="/login">
            <i className="fa fa-hand-o-right" aria-hidden="true"></i>Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
