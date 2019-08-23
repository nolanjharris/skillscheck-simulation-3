import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {};

  handleRegister = () => {};

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <div>
            <input
              name="username"
              onChange={this.handleUsername}
              placeholder="username"
              type="text"
            />
            <input name="password" placeholder="password" type="password" />
            <button onClick={this.handleRegister}>register</button>
            <button onClick={this.handleLogin}>login</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
