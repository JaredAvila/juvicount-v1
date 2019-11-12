import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
    localStorage.removeItem("userId");
  }
  render() {
    return <Redirect to="/" />;
  }
}
