import { Component } from "react";
import "./index.css";

class Header extends Component {
  render() {
    const { userData } = this.props;
    const profileText =
      userData && userData.user_email
        ? userData.user_email.slice(0, 1).toUpperCase()
        : "";
    return (
      <header className="header">
        <div className="profile">{profileText}</div>
      </header>
    );
  }
}

export default Header;
