import React, { Component } from "react";
import "./Login.css";
import TweeterLogo from "../twitter.svg";

export default class Login extends Component {
  state = {
    username: ""
  };

  handleSubmit = e => {
    e.preventDefault()
    const { username } = this.state
    if(!username) return
    localStorage.setItem('@gotweeter',username)
    this.props.history.push('/timeline')
  }

  handleInputChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={TweeterLogo} alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Nome deu usuario"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
