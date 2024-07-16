import { Component } from "react";

import { MdDeleteOutline } from "react-icons/md";


import { v4 } from "uuid";

import Header from "../Header";

import SideBar from "../SideBar";
import "./index.css";

class Dashboard extends Component {
  state = { isSideBarOpen: false, userData: {}, taskList: [], taskTitle: "" ,showError : false,errorMsg : ""};

  componentDidMount() {
    const { history } = this.props;
    const userData = localStorage.getItem("user_details");
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      this.setState({ taskList: JSON.parse(storedTasks) });
    }

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        this.setState({ userData: parsedData });
      } catch (error) {
        console.log("Error parsing user data:", error);
        history.replace("/login");
      }
    } else {
      history.replace("/login");
    }
  }

  toggleSideBarView = () => {
    this.setState((prevstate) => ({ isSideBarOpen: !prevstate.isSideBarOpen }));
  };

  addNewTask = (event) => {
    const { taskTitle ,taskList} = this.state;
    event.preventDefault();
    if (taskTitle) {
    const newTask = {
      id: v4(),
      taskTitle: taskTitle,
    };
    this.setState((prevstate) => ({
      taskList: [...prevstate.taskList, newTask],
      taskTitle: "",
    }));
    localStorage.setItem("taskList",JSON.stringify([...taskList,newTask]))

  }
  else {
    this.setState({showError : true ,errorMsg : "Please provide valid title"})
  }
  };

  handleTitleChange = (event) => {
    this.setState({ taskTitle: event.target.value });
  };

  onClickOfDelete = (id) => {
    const {taskList} = this.state 
    const updatedTaskList = taskList.filter((each)=> each.id !== id )
    this.setState({taskList : updatedTaskList})
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

  }

  renderTaskList = () => {
    const { taskList } = this.state;
    return (
      <ul className="tasklist">
        {taskList.map((each) => (
          <li className="task-item" key={each.id}>
            <p>{each.taskTitle}</p>
            <button className = "delete-btn" type="button" onClick={() => this.onClickOfDelete(each.id)}><MdDeleteOutline size={30}/></button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { isSideBarOpen, userData, taskTitle, taskList ,errorMsg,showError} = this.state;
    const username =
      userData && userData.user_email
        ? userData.user_email.split("@")[0].toUpperCase()
        : "";
    const width = isSideBarOpen ? "95%" : "95%";
    return (
      <div className="dashboard">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          toggleSideBarView={this.toggleSideBarView}
        />

        <div className="container">
          <Header userData={userData} style={{ width: width }} />
          <div className="content" style={{ width: width }}>
            <h1>{`Welcome ${username}`}</h1>
            <p>
              This is your dashboard, Here you can manage your tasks, view
              stats, and much more.
            </p>
          </div>
          <div className="content" style={{ width: width }}>
            <h2 className="task-heading">Tasks</h2>
            <form onSubmit={this.addNewTask}>
              <input
                type="text"
                className="create-task-input"
                placeholder="Create a new task"
                value={taskTitle}
                onChange={this.handleTitleChange}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
              {showError && <p className="error-msg">{errorMsg}</p>}
            </form>
            <div className="content" style={{ width: width }}>
              {taskList.length > 0 ? this.renderTaskList() : <h4>No Tasks</h4>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
