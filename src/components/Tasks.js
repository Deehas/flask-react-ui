// Library imports
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

// Internal imports
import ToastConfig from "./utils/utils";

function TasksPage(props) {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userID");

    // Load todos on page load
    if (userId) {
      getTodos(userId);
      setUserID(userId);
    }
    getCategories();
  }, []);

  const [taskForm, setTaskForm] = useState({
    title: "",
    date: "",
    time: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(1);

  function createTask(event) {
    event.preventDefault();
    if (
      taskForm.title === "" ||
      taskForm.date === "" ||
      selectedCategory === "" ||
      taskForm.time === ""
    ) {
      const msg = "Please fill all the required fields";
      toast.error(msg, ToastConfig);
    } else {
      axios({
        method: "POST",
        url: `/task/create-task/${userID}`,
        data: {
          title: taskForm.title,
          category_id: selectedCategory,
          date: taskForm.date,
          time: taskForm.time,
        },
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
        .then((response) => {
          const data = response;
          toast.success(data.data.msg, ToastConfig);
          getTodos(userID);
        })
        .catch((error) => {
          if (error.response) {
            const data = error.response;
            toast.error(data.data.msg, ToastConfig);
          }
        });
      setTaskForm({
        title: "",
        date: "",
        time: "",
      });

      setSelectedCategory(1);
    }
  }

  function deleteTask(taskId) {
    axios({
      method: "POST",
      url: "/task/delete_task",
      data: {
        task_id: taskId,
      },
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const data = response;
        toast.success(data.data.msg, ToastConfig);
        getTodos(userID);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });
  }

  function getTodos(userId) {
    axios({
      method: "GET",
      url: `/task/get-todos/${userId}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        const todos = res.todos;

        setTodos(todos);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });
  }

  function getCategories() {
    axios({
      method: "GET",
      url: "/task/get-categories",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        const categories = res.categories;

        setCategories(categories);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response;
          toast.error(data.data.msg, ToastConfig);
        }
      });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setTaskForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSelectChange(event) {
    const { value } = event.target;

    setSelectedCategory(value);
  }

  return (
    <div className="task_content categories">
      <ToastContainer />
      <div className="">
        <div className="content">
          <div className="welcome">
            <button id="openbutton" className="openbtn">
              &#9776;
            </button>
            <span className="welcome-text">Manage Your ToDo List</span>
          </div>

          <form>
            <div className="inputContainer Task">
              <div>
                <label>Title</label>
              </div>
              <br />
              <input
                onChange={handleChange}
                type="text"
                text={taskForm.title}
                placeholder="Title"
                size="32"
                name="title"
                value={taskForm.title}
              ></input>
            </div>
            <div className="inputContainer choice">
              <div>
                <label>Category</label>
              </div>
              <br />
              <select
                name="category"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="inputContainer date">
              <div>
                <label>Date</label>
              </div>
              <br />
              <input
                type="date"
                onChange={handleChange}
                text={taskForm.date}
                name="date"
                value={taskForm.date}
              ></input>
            </div>
            <div className="inputContainer time">
              <div>
                <label>Time</label>
              </div>
              <br />
              <input
                type="time"
                onChange={handleChange}
                text={taskForm.time}
                name="time"
                value={taskForm.time}
              ></input>
            </div>
            <div className="buttons">
              <button onClick={createTask} className="taskAdd btn">
                Add task
              </button>
            </div>
          </form>

          {todos &&
            todos.map((todo, index) => (
              <form key={index}>
                <div className="tabs effect-1">
                  <div className="tab-container">
                    <section id="tab-item-1">
                      <ul className="taskList">
                        <li className="currentTaskItem">
                          <label>
                            <span className="complete-">{todo.title}</span>
                          </label>
                          <span className="taskDone">at</span>
                          <strong className="taskDone">
                            <FontAwesomeIcon icon={faClock} /> {todo.time}
                          </strong>
                          <span className="taskDone">on</span>
                          <strong className="taskDatee taskDone">
                            <FontAwesomeIcon icon={faCalendar} /> {todo.date}
                          </strong>
                          <span className="categorypage-{{ todo.category }}">
                            {todo.category}
                          </span>
                          <button
                            className="taskDelete"
                            name="taskDelete"
                            onClick={() => deleteTask(todo.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
