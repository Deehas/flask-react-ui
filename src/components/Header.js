// Library imports
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Internal imports
import ToastConfig from "./utils/utils";

// Static imports
// import logo from "../logo.svg";

function Header(props) {
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
    <header className="App-header">
      <ToastContainer />
      <button onClick={logMeOut}>Logout</button>
    </header>
  );
}

export default Header;
