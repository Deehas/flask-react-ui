// Library imports
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

function HomePage(props) {
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

    setUserName(username);
  }, []);

  function getData() {
    axios({
      method: "GET",
      url: "/home",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setHomePageData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div className="main_content">
      <div className="welcome">
        <button id="openbutton" className="openbtn">
          &#9776;
        </button>
        <span className="welcome-text">
          Welcome<span className="user">{userName}</span>
          <span className="exclamation-mark">!</span>
          <i className="fa fa-smile-o" aria-hidden="true"></i>
        </span>
        {otherTaskCount > 0 ||
          businessTaskCount > 0 ||
          (personalTaskCount > 0 && (
            <div className="taskAdd">
              <a href="/tasks" className="btn btn-primary">
                <i className="fa fa-plus icon"></i> <span class="Add">Add</span>
                <span className="or">or</span>{" "}
                <i className="fa fa-trash-o icon"></i>
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
            checked="checked"
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
                  todos.map((todo, index) => {
                    <li key={index} className="currentTaskItem">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <i className="fa fa-clock-o"></i> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                      <strong className="taskDatee taskDone">
                        <i className="fa fa-calendar"></i> {todo.date}
                      </strong>
                      <span className="categoryy-{ todo.category }">
                        {todo.category}
                      </span>
                    </li>;
                  })}
              </ul>
            </section>
            <section id="tab-item-2">
              <ul id="currentTasks" className="taskList">
                {todos &&
                  todos.map((todo, index) => {
                    {
                      /* {% if todo.date.strftime('%Y-%m-%d') > DateNow %}  */
                    }
                    <li className="currentTaskItem">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <i className="fa fa-clock-o"></i> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                      <strong className="taskDatee taskDone">
                        <i className="fa fa-calendar"></i> {todo.date}
                      </strong>
                      <span className="categoryy-{{ todo.category }}">
                        {todo.category}
                      </span>
                    </li>;

                    {
                      /* {% if todo.date.strftime('%Y-%m-%d') == DateNow and todo.time.strftime('%H:%M') >= TimeNow %} */
                    }
                    <li className="currentTaskItem">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <i className="fa fa-clock-o"></i> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                      <strong className="taskDatee taskDone">
                        <i className="fa fa-calendar"></i> {todo.date}
                      </strong>
                      <span className="categoryy-{{ todo.category }}">
                        {todo.category}
                      </span>
                    </li>;
                  })}
              </ul>
            </section>
            <section id="tab-item-3">
              <ul id="overdueTasks" className="taskList">
                {todos &&
                  todos.map((todo, index) => {
                    {
                      /* { if DateNow > todo.date.strftime('%Y-%m-%d') } */
                    }
                    <li className="overdueTaskItem">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <i className="fa fa-clock-o"></i> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                      <strong className="taskDatee taskDone">
                        <i className="fa fa-calendar"></i> {todo.date}
                      </strong>
                      <span className="categoryy-{{ todo.category }}">
                        {todo.category}
                      </span>
                    </li>;
                    {
                      /* { if DateNow == todo.date.strftime('%Y-%m-%d') and todo.time.strftime('%H:%M') < TimeNow } */
                    }
                    <li className="overdueTaskItem">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <span id="TaskDone" className="complete- taskDone">
                        {todo.title}
                      </span>
                      <span className="taskDone">at</span>
                      <strong className="taskDone">
                        <i className="fa fa-clock-o"></i> {todo.time}
                      </strong>
                      <span className="taskDone">on</span>
                      <strong className="taskDatee taskDone">
                        <i className="fa fa-calendar"></i> {todo.date}
                      </strong>
                      <span className="categoryy-{{ todo.category }}">
                        {todo.category}
                      </span>
                    </li>;
                  })}
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
                      <i className="fa fa-plus icon"></i>
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
                <i className="fa fa-plus icon"></i>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
