// Library imports
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

// Internal imports
import ToastConfig from "./utils/utils";

// Static imports
import instagram from "../image/icons8-instagram-50.png";
import twitter from "../image/icons8-twitter-50.png";
import linkedin from "../image/icons8-linkedin-50.png";
import home from "../image/icons8-home-50.png";
import task from "../image/icons8-task-80.png";
import signout from "../image/icons8-logout-24.png";

function Sidebar(props) {
  const location = useLocation();
  const { pathname } = location;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");

    setUserName(username);
  }, []);

  function logMeOut() {
    axios({
      method: "GET",
      url: "/auth/logout",
    })
      .then((response) => {
        console.log(response);

        const data = response;
        console.log(data);
        toast.success(data.data.msg, ToastConfig);
        props.token();
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
        }
      });
  }

  return (
    <div className="wrapper">
      <div id="mySidebar" className="sidebar">
        <a href="javascript:void(0)" id="closebutton" className="closebtn">
          &times;
        </a>
        <div className="top-sidebar">&nbsp;{userName}'s Space</div>

        <ul>
          <li>
            <a className={pathname === "/home" && "active"} href="/home">
              <img className="" src={home} />
              Home
            </a>
          </li>
          <li>
            <a
              className={pathname === "/task" && "active"}
              href="/tasks"
            >
              <img className="" src={task} />
              Task Management
            </a>
          </li>
          <li>
            <button onClick={logMeOut}>
              <img className="" src={signout} />
              Logout
            </button>
          </li>
        </ul>
        <div className="social_media">
          <a href="https://www.linkedin.com/in/abdulsalam-saheed/">
            <img className="" src={linkedin} />
          </a>
          <a href="#">
            <img className="" src={twitter} />
          </a>
          <a href="#">
            <img className="" src={instagram} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
