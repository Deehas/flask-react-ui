// Library imports
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Internal imports
import Base from "./components/Base";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/Homepage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useToken from "./components/useToken";

function AppContext() {
  const { token, removeToken, setToken } = useToken();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="App">
      {pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/register" && <Sidebar token={removeToken} />}
      {!token && token !== "" && token !== undefined ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Routes>
            <Route
              exact
              path="/home"
              element={<HomePage token={token} setToken={setToken} />}
            ></Route>
            <Route exact path="/" element={<Base />}></Route>
            <Route
              exact
              path="/login"
              element={<Login token={token} setToken={setToken} />}
            ></Route>
            <Route
              exact
              path="/register"
              element={<Register token={token} setToken={setToken} />}
            ></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default AppContext;
