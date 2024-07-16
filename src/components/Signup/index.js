import { Component } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./index.css";


class Signup extends Component {
  state = {
    firstname: "",
    password: "",
    showPassword: false,
    email: "",
    phonenumber: "",
    showErrorMsg: false,
    errorMsg: "",
  };

  handleUserFirstNameChange = (event) => {
    this.setState({ firstname: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePhoneNumberChange = (event) => {
    this.setState({ phonenumber: event.target.value });
  };

  showAndHidePassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onSignupFailure = (errorMsg) => {
    this.setState({ showErrorMsg: true, errorMsg: errorMsg });
  };

  onSignupSuccess = () => {
    const { history } = this.props;
    this.setState({ showErrorMsg: false, errorMsg: "" });
    history.replace("/login");
  };
  onSignupFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const staticData = {
        lastname: "Doe",
        city: "Hyderabad",
        zipcode: "500071",
      };
      const { firstname, password, email, phonenumber } = this.state;
      const userDetails = {
        user_firstname: firstname,
        user_email: email,
        user_phone: phonenumber,
        user_password: password,
        user_lastname: staticData.lastname,
        user_city: staticData.city,
        user_zipcode: staticData.zipcode,
      };
      const apiUrl =
        "https://syoft.dev/Api/user_registeration/api/user_registeration";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.onSignupSuccess();
        console.log(data);
      } else {
        this.onSignupFailure(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      this.onLoginFailure("Something went wrong. Please try again.");
    }
  };

  renderSignupForm = () => {
    const { firstname, password, phonenumber, email, showPassword } =
      this.state;
    const inputType = showPassword ? "text" : "password";
    const icon = showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />;
    return (
      <form onSubmit={this.onSignupFormSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Firstname*</label>
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            onChange={this.handleUserFirstNameChange}
            value={firstname}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            onChange={this.handleEmailChange}
            value={email}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Phone Number*</label>
          <input
            type="number"
            id="number"
            placeholder="Enter Phonenumber"
            onChange={this.handlePhoneNumberChange}
            value={phonenumber}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <div className="password-container">
            <input
              type={inputType}
              placeholder="Enter Password"
              id="password"
              onChange={this.handlePasswordChange}
              value={password}
              className="password-input"
              required
            />
            <button
              type="button"
              className="show-hide-btn"
              onClick={this.showAndHidePassword}
            >
              {icon}
            </button>
          </div>
        </div>
        <button type="submit" className="login-btn">
          Signup
        </button>
      </form>
    );
  };

  render() {
    const { showErrorMsg, errorMsg } = this.state;
    return (
      <div className="signup-route">
        <div className="signup-form-container">
          <h2 className="heading">Signup</h2>
          {this.renderSignupForm()}
          {showErrorMsg && <p className="error-msg">{`*${errorMsg}`}</p>}
          <p>Already have an account?</p>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
