import { Component } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import "./index.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    errorMsg: "",
    showErrorMsg: false,
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  showAndHidePassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onLoginFailure = (errorMsg) => {
    this.setState({ showErrorMsg: true, errorMsg: errorMsg });
  };

  onLoginSuccess = (userDetails) => {
    const { history } = this.props;
    localStorage.setItem("user_details", JSON.stringify(userDetails));
    this.setState({ showErrorMsg: false, errorMsg: "" });
    history.replace("/");
  };

  onLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = this.state;
      const userDetails = { user_email: email, user_password: password };
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-Type": "application/json" },
      };
      const apiUrl = "https://syoft.dev/Api/userlogin/api/userlogin";
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(response);
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        this.onLoginSuccess(userDetails);
      } else {
        this.onLoginFailure(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      this.onLoginFailure("Something went wrong. Please try again.");
    }
  };

  renderLoginForm = () => {
    const { email, password, showPassword } = this.state;
    const inputType = showPassword ? "text" : "password";
    const icon = showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />;
    return (
      <form onSubmit={this.onLoginFormSubmit} className="login-form">
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
          <label htmlFor="password">Password</label>
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
          Login
        </button>
      </form>
    );
  };

  render() {
    const { showErrorMsg, errorMsg } = this.state;
    const userData = localStorage.getItem("user_details");
    console.log(userData);
    if (userData) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-route">
        <div className="login-form-container">
          <h2 className="heading">Login</h2>
          {this.renderLoginForm()}
          {showErrorMsg && <p className="error-msg">{`*${errorMsg}`}</p>}
          <p>Don't have an account?</p>
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
