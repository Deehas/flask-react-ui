// Library imports
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTasks,
  faSmile,
  faTrash,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

// Internal imports
import ToastConfig from "./utils/utils";

function HomePage(props) {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const [homePageData, setHomePageData] = useState(null);
  const [personalTaskCount, setPersonalTaskCount] = useState(0);
  const [businessTaskCount, setBusinessTaskCount] = useState(0);
  const [otherTaskCount, setOtherTaskCount] = useState(0);
  const [categoryOneName, setCategoryOneName] = useState("");
  const [categoryTwoName, setCategoryTwoName] = useState("");
  const [categoryThreeName, setCategoryThreeName] = useState("");
  const [todos, setTodos] = useState([]);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const userId = localStorage.getItem("userID");

    setUserName(username);

    // Load todos on page load
    getTodos(userId);
  }, []);

  function getTodos(userId) {
    axios({
      method: "GET",
      url: `/home/${userId}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        const personalTaskCount = res.no_of_personal_tasks;
        const businessTaskCount = res.no_of_business_tasks;
        const otherTaskCount = res.no_of_other_tasks;
        const categoryOneName = res.category_i_name;
        const categoryTwoName = res.category_ii_name;
        const categoryThreeName = res.category_iii_name;
        const todos = res.todos;

        setPersonalTaskCount(personalTaskCount);
        setBusinessTaskCount(businessTaskCount);
        setOtherTaskCount(otherTaskCount);
        setCategoryOneName(categoryOneName);
        setCategoryTwoName(categoryTwoName);
        setCategoryThreeName(categoryThreeName);
        setTodos(todos);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });
  }

  function dateStrToTime(params) {
    const actualDate = new Date(params);

    return actualDate.getTime();
  }

  return (
    <div className="main_content">
      <ToastContainer />
      <div className="welcome">
        <button id="openbutton" className="openbtn">
          &#9776;
        </button>
        <span className="welcome-text">
          Welcome <span className="user">{userName}</span>
          <span className="exclamation-mark">! </span>
          <FontAwesomeIcon icon={faSmile} />
        </span>
        {otherTaskCount > 0 ||
          businessTaskCount > 0 ||
          (personalTaskCount > 0 && (
            <div className="taskAdd">
              <a href="/tasks" className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} /> <span class="Add">Add</span>
                <span className="or">or</span>{" "}
                <FontAwesomeIcon icon={faTrash} />
                <span className="Delete">Delete Task(s)</span>
              </a>
            </div>
          ))}
      </div>

      <div className="category-card">
        <p className="heading">Overview</p>
        <div className="row">
          <div className="category category1">
            <span id="count"> {businessTaskCount} </span>
            <p>
              <strong className="cat1"> {categoryOneName} task(s)</strong>
            </p>
          </div>
          <div className="vl"></div>
          <div className="category category2">
            <span id="count"> {personalTaskCount} </span>
            <p>
              <strong className="cat2">{categoryTwoName} task(s)</strong>
            </p>
          </div>
          <div className="vl"></div>
          <div className="category category3">
            <span id="count"> {otherTaskCount} </span>
            <p>
              <strong className="cat3">{categoryThreeName} task(s)</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="task-card">
        <p className="heading">Todo-List</p>
        <div className="tabs effect-1">
          <input
            type="radio"
            id="tab-1"
            name="tab-effect-1"
            defaultChecked="checked"
          />
          <span>All</span>

          <input type="radio" id="tab-2" name="tab-effect-1" />
          <span>Pending</span>

          <input type="radio" id="tab-3" name="tab-effect-1" />
          <span>Overdue</span>

          <div className="tab-content">
            <section id="tab-item-1">
              <ul className="taskList">
                {todos &&
                  todos.map((todo, index) => (
                    <li key={index} className="currentTaskItem">
                      <FontAwesomeIcon icon={faTasks} />
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <FontAwesomeIcon icon={faClock} /> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                        <FontAwesomeIcon icon={faCalendar} />
                      <strong className="taskDatee taskDone">
                        {todo.date}
                      </strong>
                      <span className="categoryy-{ todo.category }">
                        {todo.category}
                      </span>
                    </li>
                  ))}
              </ul>
            </section>
            <section id="tab-item-2">
              <ul id="currentTasks" className="taskList">
                {todos &&
                  todos.map((todo, index) => (
                    <div key={index}>
                      {dateStrToTime(todo.date) > currentTime && (
                        <li className="currentTaskItem">
                          <FontAwesomeIcon icon={faTasks} />
                          <span id="TaskDone" className="complete- taskDone">
                            {todo.title}
                          </span>
                          <span className="taskDone">at</span>
                          <strong className="taskDone">
                            <FontAwesomeIcon icon={faClock} /> {todo.time}
                          </strong>
                          <span className="taskDone">on</span>
                          <strong className="taskDatee taskDone">
                            <FontAwesomeIcon icon={faCalendar} /> {todo.date}
                          </strong>
                          <span className="categoryy-{{ todo.category }}">
                            {todo.category}
                          </span>
                        </li>
                      )}
                    </div>
                  ))}
              </ul>
            </section>
            <section id="tab-item-3">
              <ul id="overdueTasks" className="taskList">
                {todos &&
                  todos.map((todo, index) => (
                    <div key={index}>
                      {currentTime > dateStrToTime(todo.date) && (
                        <li className="overdueTaskItem">
                          <FontAwesomeIcon icon={faTasks} />
                          <span id="TaskDone" className="complete- taskDone">
                            {todo.title}
                          </span>
                          <span className="taskDone">at</span>
                          <strong className="taskDone">
                            <FontAwesomeIcon icon={faClock} /> {todo.time}
                          </strong>
                          <span className="taskDone">on</span>
                            <FontAwesomeIcon icon={faCalendar} />
                          <strong className="taskDatee taskDone"> {todo.date}
                          </strong>
                          <span className="categoryy-{{ todo.category }}">
                            {todo.category}
                          </span>
                        </li>
                      )}
                    </div>
                  ))}
              </ul>
            </section>

            {otherTaskCount == 0 &&
              businessTaskCount == 0 &&
              personalTaskCount == 0 && (
                <>
                  <div className="No-task">
                    <h2>No task yet</h2>
                  </div>
                  <div className="Addtask">
                    <a href="/tasks" className="btn btn-primary">
                      <FontAwesomeIcon icon={faPlus} />
                      <span className="Add">Add Task(s) </span>
                    </a>
                  </div>
                </>
              )}
          </div>
        </div>
        {otherTaskCount > 0 ||
          businessTaskCount > 0 ||
          (personalTaskCount > 0 && (
            <div className="Addtask">
              <a href="/tasks" className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} />
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
