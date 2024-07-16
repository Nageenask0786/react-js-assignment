import { FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { withRouter } from "react-router-dom";
import "./index.css";

const SideBar = (props) => {
  const { isSideBarOpen, toggleSideBarView, history } = props;

  const sideBarClassName = isSideBarOpen
    ? "opened-side-bar"
    : "closed-side-bar";

  const onClickOfLogout = () => {
    localStorage.removeItem("user_details");
    history.replace("/login");
  };

  return (
    <div className={sideBarClassName}>
      <button
        type="button"
        onClick={toggleSideBarView}
        className="toggle-button"
      >
        d
      </button>
      {isSideBarOpen ? (
        <ul className="side-bar-items">
          <li className="side-bar-item">
            <FaTasks size={20} color="#737373" />
            <p className="item-name">Tasks</p>
          </li>
          <li className="side-bar-item">
            <IoMdAdd size={20} color="#737373" />
            <p className="item-name">Create Task</p>
          </li>
          <li className="side-bar-item">
          <button type="button" onClick={onClickOfLogout} className="btn">
            <MdLogout size={20} color="#737373" />
            <p className="item-name">Logout</p>
            </button>
          </li>
        </ul>
      ) : (
        <ul className="side-bar-items">
          <li className="side-bar-item">
            <FaTasks size={20} color="#737373" />
          </li>
          <li className="side-bar-item">
            <IoMdAdd size={20} color="#737373" />
          </li>
          <li className="side-bar-item">
          <button type="button" onClick={onClickOfLogout} className="btn">
            <MdLogout size={20} color="#737373" />
            </button>
          </li>
             </ul>
      )}
    </div>
  );
};

export default withRouter(SideBar);
