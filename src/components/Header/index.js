import { Component } from "react";
import "./index.css";

class Header extends Component {
  state = { userData: {} };

  componentDidMount() {
    const { history } = this.props;
    const userData = localStorage.getItem("user_details");

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

  render() {
    const { userData } = this.state;
    const currentDate = new Date();
    const hours = currentDate.getHours();

    const getGreeting = (hour) => {
      if (hour >= 5 && hour < 12) {
        return "Hello, Good morning!";
      } else if (hour >= 12 && hour < 18) {
        return "Hello, Good afternoon!";
      } else {
        return "Hello, Good evening!";
      }
    };

    const greeting = getGreeting(hours);
    const profileText =
      userData && userData.user_email
        ? userData.user_email.slice(0, 1).toUpperCase()
        : "";

    return (
      <header className="header">
        <h3 className="greeting">{greeting}</h3>
        <div className="profile">{profileText}</div>
      </header>
    );
  }
}

export default Header;
