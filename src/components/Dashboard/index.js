import { Component } from "react";

import Header from "../Header";

import SideBar from "../SideBar";
import "./index.css";

class Dashboard extends Component {
  state = { isSideBarOpen: false };

  toggleSideBarView = () => {
    this.setState((prevstate) => ({ isSideBarOpen: !prevstate.isSideBarOpen }));
  };

  render() {
    const { isSideBarOpen } = this.state;
    const width = isSideBarOpen ? "calc(100vw - 140px)" : "calc(100vw - 56px)";
    return (
      <div className="dashboard">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          toggleSideBarView={this.toggleSideBarView}
        />

        <div className="container" style={{ width: width }}>
          <Header/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
