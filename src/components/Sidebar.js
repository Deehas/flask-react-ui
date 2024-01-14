// Library imports
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faHome,
  faSignOut,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");

    setUserName(username);
  }, []);

  useEffect(() => {
    const openNav = () => {
      document.getElementById("mySidebar").style.width = "200px";
    };

    const closeNav = () => {
      document.getElementById("mySidebar").style.width = "0";
    };

    const handleButtonClick = () => {
      const sidebar = document.getElementById("mySidebar");
      if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        openNav();
      } else {
        closeNav();
      }
    };

    const x = window.matchMedia("(max-width: 880px)");

    const sideBarFunction = (mediaQuery) => {
      const sidebar = document.getElementById("mySidebar");
      const openButton = document.getElementById("openbutton");
      const closeButton = document.getElementById("closebutton");

      if (mediaQuery.matches) {
        sidebar.style.width = "0";
      } else {
        sidebar.style.width = "200px";
      }

      if (openButton) {
        document.getElementById("openbutton").onclick = openNav;
      }
      if (closeButton) {
        document.getElementById("closebutton").onclick = closeNav;
      }
    };

    sideBarFunction(x);
    x.addEventListener("change", () => sideBarFunction(x));

    return () => {
      x.removeEventListener("change", () => sideBarFunction(x));
    };
  }, []);

  function logMeOut() {
    axios({
      method: "GET",
      url: "/auth/logout",
    })
      .then((response) => {
        const data = response;
        toast.success(data.data.msg, ToastConfig);
        props.token();

        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
        }
      });
  }

  return (
    <div id="mySidebar" className="sidebar">
      <a href="" id="closebutton" className="closebtn">
        &times;
      </a>
      <div className="top-sidebar">&nbsp;{userName}'s Space</div>

      <ul>
        <li>
          <a className={pathname === "/home" ? "active" : ""} href="/home">
            <FontAwesomeIcon icon={faHome} />
            Home
          </a>
        </li>
        <li>
          <a className={pathname === "/task" ? "active" : ""} href="/tasks">
            <FontAwesomeIcon icon={faTasks} />
            Task Management
          </a>
        </li>
        <li>
          <button onClick={logMeOut}>
            <FontAwesomeIcon icon={faSignOut} />
            Logout
          </button>
        </li>
      </ul>
      <div className="social_media">
        <a href="https://www.linkedin.com/in/abdulsalam-saheed/">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
